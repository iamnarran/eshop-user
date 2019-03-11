import React from "react";
import config from "config";
import api from "../../api";
import {
  Magnify,
  Rate,
  RelationalProduct,
  Information,
  CardSlider,
  Comment
} from "../../components";
import { Spin } from "antd";

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

    parentCategory: [],
    category: [],
    breadCrumb: [],

    saleNumber: null, //Hudaldaalagdah too shirheg hamgiin bagdaa
    sumPrice: null, //Hudaldaalagdah niit dun vne (too shirhegees hamaarna)
    kgPrice: null, //Kg -aar zaragdah vne
    grPrice: null, //Gr -aar zaragdah vne
    issalekg: false, //kr-aar zaragdah baraa mun eseh

    attribute: [],

    selectedMediumImg: null,
    selectedLargeImg: null,
    smallImg: [],

    isLoading: false
  };

  componentWillMount() {
    this.setState({
      skucd: this.props.match.params.id,
      category: this.props.container.category
    });
  }
  componentDidMount() {
    this.refresh();
  }

  componentWillUpdate(prevProps) {
    if (prevProps.container.category !== this.props.container.category) {
      this.setState({
        skucd: this.props.match.params.id,
        category: this.props.container.category
      });
    }
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.refresh();
    }
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
          <div className="container pad10">
            {this.renderBreadCrumb(breadCrumb)}
            <div className="product-detail-page">
              <div className="row row10">
                {this.renderProductImg()}
                {this.renderProductDescription()}
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

  getCategory = product => {
    const { breadCrumb, category } = this.state;
    if (product.length !== 0) {
      let parent = product.catid;
      category.reverse().map(i => {
        if (parent === i.id) {
          breadCrumb.push(i);
          parent = i.parentid;
        }
        return null;
      });
      breadCrumb.reverse();

      this.setState({
        product: product,
        breadCrumb: breadCrumb,
        saleNumber: product.saleminqty,
        sumPrice:
          product.issalekg === 1
            ? product.kgproduct[0].salegramprice * product.saleminqty
            : product.spercent === 100
            ? product.price * product.saleminqty
            : product.sprice * product.saleminqty,
        issalekg: product.issalekg,
        grPrice:
          product.issalekg === 1 ? product.kgproduct[0].salegramprice : null,
        kgPrice:
          product.issalekg === 1 ? product.kgproduct[0].kilogramprice : null,
        isLoading: true
      });
    }
  };

  renderBreadCrumb = e => {
    return (
      <div className="e-breadcrumb">
        <ul className="list-unstyled">
          {e.map((i, key) => {
            return (
              <li key={key}>
                <a href="/">{i.name}</a>
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
      <div className="col-xl-4 col-lg-4 col-md-5 pad10">
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
                          alt={i.id}
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
                <a href="/">
                  <span>
                    <i className="fa fa-facebook" aria-hidden="true" />
                  </span>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="/">
                  <span>
                    <i className="fa fa-twitter" aria-hidden="true" />
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };
  onChangeMniImage = e => {
    const { images } = this.state.product;
    images.map(index => {
      return Number(index.id) === Number(e.target.alt)
        ? this.setState({
            selectedMediumImg: IMAGE + index.imgmdm,
            selectedLargeImg: e.target.className
          })
        : "";
    });
  };

  renderFooter = () => {
    const { attribute, collectionProduct, skucd, product } = this.state;
    return (
      <div className="row row10">
        <div className="col-xl-9 pad10">
          <Information attribute={attribute} />
          {collectionProduct.length === 0 ? (
            ""
          ) : (
            <div>
              <h1 className="title">
                <span className="text-uppercase">Ижил бараа</span>
              </h1>
              <div className="section">
                <div className="container pad10">
                  <div className="row row10">
                    <CardSlider
                      data={collectionProduct}
                      params={productParams}
                      elContainer={"collectionProduct"}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/**ТАНИЛЦУУЛАГА */}
          <h1 className="title">
            <span className="text-uppercase">Танилцуулга</span>
          </h1>
          <div className="product-bottom-images">
            {this.state.product &&
              this.state.product.images &&
              this.state.product.images.map((index, key) => {
                return (
                  <img alt={index.id} src={IMAGE + index.imglrg} key={key} />
                );
              })}
          </div>
          <Comment
            skucd={skucd}
            rate={product !== undefined ? product.rate : []}
          />
        </div>
      </div>
    );
  };
  addProduct = () => {
    const { saleNumber, product, issalekg, sumPrice, grPrice } = this.state;
    if (saleNumber < product.availableqty && product.availableqty !== 0) {
      if (saleNumber < product.salemaxqty || product.salemaxqty === 0) {
        this.setState({
          saleNumber: saleNumber + 1,
          sumPrice: issalekg
            ? sumPrice + grPrice
            : product.spercent !== 100
            ? sumPrice + product.sprice
            : sumPrice + product.price
        });
      }
    }
  };
  remProduct = () => {
    const { saleNumber, product, issalekg, sumPrice, grPrice } = this.state;
    if (saleNumber > product.saleminqty) {
      //hamgiin  bagdaa zarag too shirhegiin hyzgaarlalt
      this.setState({
        saleNumber: saleNumber - 1,
        sumPrice: issalekg
          ? sumPrice - grPrice
          : product.spercent !== 100
          ? sumPrice - product.sprice
          : sumPrice - this.state.product.price
      });
    }
  };
  renderProductDelivery = () => {
    const { relationalProduct } = this.state;
    return (
      <div className="col-xl-3 col-lg-3 col-md-12 pad10 magnify-image">
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
  renderProductDescription = () => {
    const { product, breadCrumb, saleNumber, sumPrice, issalekg } = this.state;
    return (
      <div className="col-xl-5 col-lg-5 col-md-7 pad10 magnify-image">
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
          <Rate rate={5} numOfVotes={197} />
          <div className="gift">
            <div className="image-container" />
            <div className="info-container" />
          </div>
          <form>
            <div className="row row10">
              <div className="col-xl-4 col-6 pad10">
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
              <div className="col-xl-8 pad10">
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
              <a href="/" className="btn btn-gray text-uppercase">
                <span>Хадгалах</span>
              </a>
              <a href="/" className="btn btn-main text-uppercase">
                <i className="fa fa-shopping-cart" aria-hidden="true" />
                <span>Сагсанд нэмэх</span>
              </a>
              {/* <p className="text text-right">Урамшуулал 2 хоногийн дараа дуусна</p> */}
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

export default Component;
