import React from "react";
import config from "config";
import { connect } from "react-redux";
import api from "../api";
import storage from "../utils/storage";
import { Link } from "react-router-dom";
import { updateCart } from "../actions/cart";
import { toast } from "react-toastify";
import { getFeedbacks } from "../actions/mainlogic";
import {
  Magnify,
  RelationalProduct,
  Information,
  CardSlider,
  Comment
} from "../components";
import { Spin, Rate } from "antd";
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon
} from "react-share";

const IMAGE =
  process.env.NODE_ENV === "development"
    ? config.image.development
    : config.image.production;
const money = new Intl.NumberFormat("en-US");
class Component extends React.Component {
  state = {
    skucd: null,
    product: [],
    relationalProduct: [],
    collectionProduct: [],
    loggedin: false,
    parentCategory: [],
    category: [],
    breadCrumb: [],
    userInfo: [],
    saleNumber: null, //Hudaldaalagdah too shirheg hamgiin bagdaa
    sumPrice: null, //Hudaldaalagdah niit dun vne (too shirhegees hamaarna)
    kgPrice: null, //Kg -aar zaragdah vne
    grPrice: null, //Gr -aar zaragdah vne
    issalekg: false, //kr-aar zaragdah baraa mun eseh
    addminqty: null,
    attribute: [],
    selectedMediumImg: null,
    selectedLargeImg: null,
    smallImg: [],
    currentUrl: null,
    isLoading: false
  };

  notify = message => toast(message, { autoClose: 5000 });
  componentWillMount() {
    this.setState({
      skucd: this.props.match.params.id,
      category: this.props.container.category
    });
    if (storage.get("user")) {
      let user = storage.get("user");
      if (user.customerInfo) {
        user = user.customerInfo;
      }
      this.setState({ userInfo: user, loggedin: true });
    }
  }
  componentDidMount() {
    this.refresh();
  }

  componentWillUpdate(prevProps) {
    if (
      prevProps.container.category !== this.props.container.category ||
      this.state.skucd !== this.props.match.params.id
    ) {
      this.setState(
        {
          skucd: this.props.match.params.id,
          category: this.props.container.category
        },
        () => {
          this.refresh();
        }
      );
    }
    // if (prevProps.match.params.id !== this.props.match.params.id) {
    //  this.refresh();
    //  }
  }

  render() {
    const { breadCrumb, skucd, isLoading } = this.state;
    if (skucd !== this.props.match.params.id) {
      this.setState({ skucd: this.props.match.params.id });
      this.refresh();
    }

    if (isLoading) {
      return (
        <div className="section">
          <div className="container">
            {this.renderBreadCrumb(breadCrumb)}
            <div className="product-detail-page col-md-12 col-sm-12 col-lg-12">
              <div className="row row10">
                <div className="col-sm-9 col-md-9 col-lg-9 row">
                  {this.renderProductImg()}
                  {this.renderProductDescription()}
                </div>
                {this.renderProductDelivery()}
                {this.renderFooter()}
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="e-mart-loading">
        <Spin />
      </div>
    );
  }
  refresh = async () => {
    const { skucd } = this.state;
    await api.product
      .productCollection({ skucd: skucd })
      .then(res =>
        res.success
          ? this.setState({ collectionProduct: res.data, breadCrumb: [] })
          : console.log("collectionProduct", res)
      );
    await api.product
      .productAttribute({ skucd: skucd })
      .then(res =>
        res.success
          ? this.setState({ attribute: res.data })
          : console.log("attribute", res)
      );
    await api.product
      .productRelational({ skucd: skucd })
      .then(res =>
        res.success
          ? this.setState({ relationalProduct: res.data })
          : console.log("relationalProduct", res)
      );
    await api.product
      .productDetail({ skucd: skucd })
      .then(res =>
        res.success
          ? this.getCategory(res.data[0])
          : console.log("productDetail", res)
      );
    await api.product
      .productDetailImg({ skucd: skucd })
      .then(res =>
        res.success
          ? this.setState({ smallImg: res.data })
          : console.log("productDetailImg", res)
      );
  };

  check = (res, item, found, cart) => {
    let tmp = getFeedbacks(res, item, found, cart);
    if (tmp == false) {
      this.notify(res.message);
    } else {
      this.props.updateCart({
        products: tmp.products,
        totalQty: tmp.totalQty,
        totalPrice: tmp.totalPrice
      });
    }
  };

  generateSaleMinQty = saleminqty => {
    if (saleminqty === 0) {
      return 1;
    } else {
      return saleminqty;
    }
  };

  handleAddClick = e => {
    e.preventDefault();
    const item = this.state.product;
    let cart = storage.get("cart")
      ? storage.get("cart")
      : { products: [], totalQty: 0, totalPrice: 0 };

    const found = cart.products.find(product => product.cd === item.cd);

    let itemQty = 0;
    if (found) {
      itemQty = found.qty;
    }

    api.product
      .isAvailable({
        skucd: item.id ? item.id : item.cd ? item.cd : null,
        qty: itemQty + 1
      })
      .then(res => {
        this.check(res, item, found, cart);
      });
  };

  handleSaveClick = e => {
    e.preventDefault();
    console.log(e.target);
  };

  getCategory = product => {
    const { breadCrumb, category } = this.state;
    let tmp = [];
    if (product !== undefined) {
      if (product.length !== 0) {
        let parent = product.catid;
        category.reverse().map(i => {
          if (parent === i.id) {
            tmp.push(i);
            parent = i.parentid;
          }
          return null;
        });
        tmp.reverse();

        this.setState({
          product: product,
          breadCrumb: tmp,
          addminqty: product.addminqty,
          saleNumber: this.generateSaleMinQty(product.saleminqty),
          sumPrice:
            product.issalekg === 1
              ? product.kgproduct[0].salegramprice *
                this.generateSaleMinQty(product.saleminqty)
              : product.spercent === 100
              ? product.price * this.generateSaleMinQty(product.saleminqty)
              : product.sprice * this.generateSaleMinQty(product.saleminqty),
          issalekg: product.issalekg,
          grPrice:
            product.issalekg === 1 ? product.kgproduct[0].salegramprice : null,
          kgPrice:
            product.issalekg === 1 ? product.kgproduct[0].kilogramprice : null,
          isLoading: true
        });
      }
    }
  };

  renderBreadCrumb = e => {
    console.log(e);
    return (
      <div className="e-breadcrumb">
        <ul className="list-unstyled">
          {e.map((i, key) => {
            return (
              <li key={key}>
                <Link to={i.route ? i.route : ""}>{i.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };
  renderProductImg = () => {
    const {
      product,
      selectedMediumImg,
      smallImg,
      selectedLargeImg
    } = this.state;
    return (
      <div className="col-xl-5 col-lg-5 col-md-5">
        <div className="product-gallery">
          <Magnify
            img={
              selectedMediumImg === null
                ? IMAGE + product.img
                : selectedMediumImg
            }
            images={smallImg}
            tags={product.tags}
            slImg={selectedLargeImg}
          />
          <div className="thumbs">
            <ul className="list-inline">
              {product &&
                product.images &&
                product.images.map((i, key) => {
                  return (
                    <li className="list-inline-item" key={key}>
                      <a
                        className="image-container"
                        onClick={this.onChangeMniImage}
                      >
                        <img
                          alt={i.seq}
                          className={key}
                          src={IMAGE + i.imgmni}
                        />
                      </a>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="share">
            <ul className="list-inline">
              <li className="list-inline-item">
                <span>Хуваалцах:</span>
              </li>
              <li className="list-inline-item">
                <FacebookShareButton
                  url={window.location.href}
                  quote={product.name}
                  className="Demo__some-network__share-button"
                >
                  <FacebookIcon size={25} round />
                </FacebookShareButton>
              </li>
              <li className="list-inline-item">
                <TwitterShareButton
                  url={window.location.href}
                  quote={product.name}
                  className="Demo__some-network__share-button"
                >
                  <TwitterIcon size={25} round />
                </TwitterShareButton>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  createMarkup = product => {
    return { __html: product.description };
  };

  onChangeMniImage = e => {
    const { images } = this.state.product;
    images.map(index => {
      return Number(index.seq) === Number(e.target.alt)
        ? this.setState({
            selectedMediumImg: IMAGE + index.imgmdm,
            selectedLargeImg: e.target.className
          })
        : "";
    });
  };

  renderFooter = () => {
    const { attribute, collectionProduct, skucd, product } = this.state;
    if (collectionProduct.length <= 4) {
      productParams.loop = false;
    }
    productParams.slidesPerView = collectionProduct.length;
    return (
      <div className="col-md-12 col-lg-12 col-sm-12 col-xl-12">
        {attribute.length !== 0 ? <Information attribute={attribute} /> : ""}
        {collectionProduct.length == 0 ? (
          ""
        ) : (
          <div>
            <h1 className="title">
              <span className="text-uppercase">Ижил бараа</span>
            </h1>
            <div className="section">
              <div className="row row10">
                <CardSlider
                  data={collectionProduct}
                  params={productParams}
                  elContainer={"collectionProduct"}
                />
              </div>
            </div>
          </div>
        )}

        {/**ТАНИЛЦУУЛАГА */}
        {product.description == null ? (
          ""
        ) : (
          <div>
            <h1 className="title">
              <span className="text-uppercase">Танилцуулга</span>
            </h1>

            {/*   {this.state.product &&
                this.state.product.images &&
                this.state.product.images.map((index, key) => {
                  return (
                    <img alt={index.id} src={IMAGE + index.imglrg} key={key} />
                  );
                })} */}
            <div dangerouslySetInnerHTML={this.createMarkup(product)} />
          </div>
        )}

        <Comment
          skucd={skucd}
          rate={product !== undefined ? product.rate : []}
          userInfo={this.state.loggedin == true ? this.state.userInfo : null}
          loggedin={this.state.loggedin == true ? this.state.loggedin : false}
        />
      </div>
    );
  };

  getRatesum = () => {
    const { product } = this.state;
    let sum = 0;
    if (product !== undefined) {
      if (product.rate !== undefined && product.rate.length !== 0) {
        product.rate.map(i => (sum += i.rate));
      }
    }
    let tmp = (sum / product.rate.length).toFixed(2);
    if (isNaN(tmp) || tmp == undefined) {
      tmp = 0;
    }
    return tmp;
  };

  addProduct = () => {
    const { saleNumber, addminqty, product, issalekg, grPrice } = this.state;

    if (saleNumber < product.availableqty && product.availableqty !== 0) {
      if (saleNumber < product.salemaxqty || product.salemaxqty === 0) {
        if (product.salemaxqty !== 0) {
          if (product.salemaxqty > saleNumber + addminqty) {
            this.addProductLimit(saleNumber + addminqty);
          } else {
            this.addProductLimit(product.salemaxqty);
          }
        } else {
          this.addProductLimit(saleNumber + addminqty);
        }
      }
    }
  };

  addProductLimit = value => {
    const { saleNumber, addminqty, product, issalekg, grPrice } = this.state;
    this.setState({
      saleNumber: value,
      sumPrice:
        issalekg === 1
          ? grPrice * value
          : product.spercent !== 100
          ? product.sprice * value
          : product.price * value
    });
  };

  remProduct = () => {
    const {
      saleNumber,
      product,
      addminqty,
      issalekg,
      sumPrice,
      grPrice
    } = this.state;
    if (saleNumber > product.saleminqty) {
      //hamgiin  bagdaa zarag too shirhegiin hyzgaarlalt
      if (product.saleminqty !== 0) {
        if (product.saleminqty < saleNumber - addminqty) {
          this.remProductLimit(saleNumber - addminqty);
        } else {
          this.remProductLimit(product.saleminqty);
        }
      } else {
        this.remProductLimit(saleNumber - addminqty);
      }
    }
  };

  remProductLimit = value => {
    const {
      saleNumber,
      product,
      addminqty,
      issalekg,
      sumPrice,
      grPrice
    } = this.state;
    this.setState({
      saleNumber: value,
      sumPrice: issalekg
        ? grPrice * value
        : product.spercent !== 100
        ? product.sprice * value
        : product.price * value
    });
  };

  handleRate = e => {
    console.log(e);
  };

  renderProductDelivery = () => {
    const { relationalProduct } = this.state;
    return (
      <div className="col-xl-3 col-lg-3 col-sm-3 col-md-3">
        <div className="product-plus">
          <div className="block product-delivery">
            <p className="title">
              <strong>Хүргэлтийн мэдээлэл</strong>
            </p>
            <p className="text">
              <span>
                Энгийн хүргэлт (48 цагийн дотор) - 89,000₮ дээш бараа авсан
                тохиолдолд үнэгүй
              </span>
            </p>
          </div>
          <RelationalProduct product={relationalProduct} />
        </div>
      </div>
    );
  };

  dateHourFormatter = cell => {
    if (cell) {
      if (cell === null) {
        return null;
      } else {
        cell = cell.slice(0, 10);
        return cell;
      }
    }
  };

  generateDate = product => {
    if (product.edate == null || product.sdate == null) {
      return "";
    } else {
      var date1 = new Date(this.dateHourFormatter(product.sdate));
      var date2 = new Date(this.dateHourFormatter(product.edate));
      var timeDiff = Math.abs(date2.getTime() - date1.getTime());
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return diffDays;
    }
  };

  renderProductDescription = () => {
    const { product, breadCrumb, saleNumber, sumPrice, issalekg } = this.state;
    return (
      <div className="col-xl-7 col-lg-7 col-md-7">
        <div className="product-info">
          <h5 className="title">{product.name}</h5>({product.backtxt})
          <p className="big-text">
            <strong>
              {breadCrumb.map((i, e) => {
                if (e === breadCrumb.length - 1) {
                  return i.name;
                } else {
                  return null;
                }
              })}
            </strong>
          </p>
          <div className="main-rating">
            <Rate
              allowHalf
              defaultValue={this.getRatesum()}
              onChange={this.handleRate}
            />
            <p className="text">
              ({product.rate.length} хүн үнэлгээ өгсөн байна)
            </p>
          </div>
          <div className="gift">
            <div className="image-container" />
            <div className="info-container" />
          </div>
          <form>
            <div className="row row10">
              <div className="col-xl-4 col-6">
                <div className="input-group">
                  <div className="input-group-prepend" id="button-addon4">
                    <button
                      className="btn product-detail-btn"
                      type="button"
                      onClick={this.remProduct}
                    >
                      <i className="fa fa-minus" aria-hidden="true" />
                    </button>
                  </div>
                  <input
                    alt="asfasd"
                    className="form-control"
                    placeholder=""
                    value={saleNumber}
                    aria-label=""
                    aria-describedby="button-addon4"
                  />
                  <div className="input-group-append" id="button-addon4">
                    <button
                      className="btn product-detail-btn"
                      type="button"
                      onClick={this.addProduct}
                    >
                      <i className="fa fa-plus" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-xl-8">
                <p className="count-text text-right">
                  {issalekg === 1 ? product.saleweight : ""}
                  {" " + product.measure + " -н "}
                  үнэ: &emsp;
                  {//kg-aar zaragdah baraa eseh
                  issalekg === 1 ? (
                    money.format(product.kgproduct[0].salegramprice)
                  ) : product.spercent === 100 ? (
                    money.format(product.price)
                  ) : (
                    <div className="price product-detail">
                      <small
                        className="sale"
                        style={{ textDecoration: "line-through" }}
                      >
                        {" "}
                        {money.format(product.price)}₮{" "}
                      </small>
                      &nbsp;&nbsp;
                      <span className="current">
                        {" "}
                        {money.format(product.sprice)}
                      </span>
                    </div>
                  )}
                  ₮
                </p>
                {issalekg ? (
                  <p className="count-text text-right">
                    {"кг үнэ: " + money.format(this.state.kgPrice) + "₮"}
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="total-price text-right">
              <span>Дүн:</span>
              <strong>{money.format(sumPrice)}₮</strong>
            </div>
            <div className="btn-container text-right">
              <button
                className="btn btn-gray text-uppercase"
                onClick={this.handleSaveClick}
              >
                <span>Хадгалах</span>
              </button>
              <button
                className="btn btn-main text-uppercase"
                disabled={product.availableqty > 0 ? false : true}
                onClick={this.handleAddClick}
              >
                <i className="fa fa-shopping-cart" aria-hidden="true" />
                <span>Сагсанд нэмэх</span>
              </button>
              <br />
              {product.sprice == 0 ? (
                ""
              ) : (
                <p className="text text-right">
                  Хямдрал {this.generateDate(product)} хоногийн дараа дуусна
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  };
}

const productParams = {
  slidesPerView: 4,
  spaceBetween: 0,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  pagination: {
    type: "bullets",
    clickable: true
  }
};

export default connect(
  null,
  { updateCart }
)(Component);
