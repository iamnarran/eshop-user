import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Rate } from "antd";
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon
} from "react-share";

import { updateCart } from "../actions/cart";
import { getFeedbacks } from "../actions/mainlogic";
import { IMAGE } from "../utils/consts";
import Gallery from "../components/Gallery";
import LoginModal from "../components/LoginModal";
import { CommentList, CardSlider, Breadcrumb } from "../components";
import withCart from "../components/HOC/withCart";

const formatter = new Intl.NumberFormat("en-US");

class ProductDetail extends Component {
  state = {
    productQty: 1,
    isLoginModalVisible: false
  };

  renderDetails = () => {
    const { categories, product } = this.props.container;

    const selectedCat =
      product.catid && categories.find(cat => cat.id === product.catid);

    return (
      <div className="col-xl-7 col-lg-7 col-md-7">
        <div className="product-info">
          <h5 className="title">{product.name}</h5>

          {product.backtxt && `(${product.backtxt})`}

          {selectedCat && (
            <p className="big-text">
              <strong>
                <Link to={selectedCat.route} style={{ color: "#6c757d" }}>
                  {selectedCat.name}
                </Link>
              </strong>
            </p>
          )}

          <div className="main-rating">
            <Rate
              allowHalf
              defaultValue={this.getRateValue()}
              onChange={this.handleRateChange}
            />

            <p className="text">
              (
              {product.rate.length
                ? `${product.rate.length} хүн үнэлгээ өгсөн байна`
                : "Одоогоор үнэлгээ өгөөгүй байна"}
              )
            </p>
          </div>

          <div className="gift">
            <div className="image-container" />
            <div className="info-container" />
          </div>

          {this.renderCartInfo()}
        </div>
      </div>
    );
  };

  renderCartInfo = () => {
    const { product } = this.props.container;

    let priceTitle = "Үнэ: ";
    let price = product.price;

    if (product.issalekg && product.kgproduct[0]) {
      priceTitle = `${product.kgproduct[0].salegram} гр-н үнэ: `;
      price = product.kgproduct[0].salegramprice;
    }

    if (product.spercent && product.spercent !== 100) {
      // Хямдарсан үед
      price = (
        <div className="price product-detail">
          {!product.issalekg && (
            <small
              className="sale"
              style={{ textDecoration: "line-through", marginLeft: "5px" }}
            >
              {formatter.format(price)}₮
            </small>
          )}
          <span className="current" style={{ marginLeft: "5px" }}>
            {formatter.format(product.issalekg ? price : product.sprice)}₮
          </span>
        </div>
      );
    } else {
      // Хямдраагүй үед
      price = (
        <span className="current" style={{ marginLeft: "5px" }}>
          {formatter.format(price)}₮
        </span>
      );
    }

    return (
      <form>
        <div className="row row10">
          <div className="col-xl-4 col-6">
            <div className="input-group">
              <div className="input-group-prepend" id="button-addon4">
                <button
                  onClick={this.handleDecrementClick}
                  className="btn"
                  type="button"
                >
                  <i className="fa fa-minus" aria-hidden="true" />
                </button>
              </div>

              <input
                type="text"
                className="form-control"
                value={this.state.productQty}
                name="productQty"
                onChange={this.handleQtyChange}
              />

              <div className="input-group-append" id="button-addon4">
                <button
                  onClick={this.handleIncrementClick}
                  className="btn"
                  type="button"
                >
                  <i className="fa fa-plus" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          <div className="col-xl-8">
            <div className="count-text text-right">
              {priceTitle}
              {price}
            </div>

            {!!product.issalekg && !!product.kgproduct[0] && (
              <p className="count-text text-right">
                {`Кг үнэ: ${formatter.format(
                  product.kgproduct[0].kilogramprice
                )}₮`}
              </p>
            )}
          </div>
        </div>

        <div className="total-price text-right">
          <span>Дүн:</span>
          <strong>{formatter.format(this.getTotalPrice())}₮</strong>
        </div>

        <div className="btn-container text-right">
          <button
            type="button"
            className="btn btn-gray text-uppercase"
            style={{ marginRight: "10px" }}
            onClick={this.handleSaveClick}
          >
            <span>Хадгалах</span>
          </button>

          <button
            type="button"
            className="btn btn-main text-uppercase"
            disabled={product.availableqty < 1}
            onClick={() => this.props.onUpdate(product, this.state.productQty)}
          >
            <i className="fa fa-shopping-cart" aria-hidden="true" />{" "}
            <span>Сагсанд нэмэх</span>
          </button>

          {product.sprice === 100 && (
            <p className="text text-right">
              Хямдрал {this.generateDate(product)} хоногийн дараа дуусна
            </p>
          )}
        </div>
      </form>
    );
  };

  renderDeliveryInfo = () => {
    const { product } = this.props.container;

    if (!product.deliverytxt) {
      return;
    }

    return (
      <div className="block product-delivery">
        <p className="title">
          <strong>Хүргэлтийн мэдээлэл</strong>
        </p>
        <p className="text">
          <span>{product.deliverytxt}</span>
        </p>
      </div>
    );
  };

  renderRelatedProducts = (limit = 4) => {
    let { relatedProducts } = this.props.container;

    relatedProducts =
      relatedProducts.length > limit
        ? relatedProducts.slice(0, limit)
        : relatedProducts;

    return (
      !!relatedProducts.length && (
        <div className="product-suggest">
          <p className="title">
            <strong>Хослох бараа</strong>
          </p>
          <ul className="list-unstyled">
            {relatedProducts.map((prod, index) => {
              return (
                <li key={index}>
                  <div className="single flex-this">
                    <div className="image-container">
                      <Link to={prod.route ? prod.route : ""}>
                        <span
                          className="image"
                          style={{
                            backgroundImage: `url(${IMAGE}${prod.imgnm})`
                          }}
                        />
                      </Link>
                    </div>

                    <div className="info-container flex-space">
                      <Link to={prod.route ? prod.route : ""}>
                        <span>{prod.name}</span>
                        <strong>{formatter.format(prod.price)}₮</strong>
                      </Link>
                      <div className="action">
                        <button
                          type="button"
                          className="btn btn-link"
                          onClick={() => this.props.onIncrement(prod)}
                        >
                          <i
                            className="fa fa-cart-plus"
                            aria-hidden="true"
                            style={{ fontSize: "1.2rem" }}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="more-link text-center">
            <Button
              className="btn btn-border"
              onClick={this.handleMoreRelatedProductsClick}
            >
              <span className="text text-uppercase">
                Бүх хослох барааг үзэх
              </span>
            </Button>
          </div>
        </div>
      )
    );
  };

  renderMoreInfo = () => {
    let { product, attributes, similarProducts } = this.props.container;

    const similarProductsLimit = 4;
    const shouldLoop = similarProducts.length > similarProductsLimit;

    const params = {
      slidesPerView: 4,
      spaceBetween: 0,
      loop: shouldLoop,
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

    return (
      <div className="col-md-12 col-lg-12 col-sm-12 col-xl-12">
        {!!attributes && !!attributes.length && (
          <div style={{ marginTop: "80px", marginBottom: "0" }}>
            <h1 className="title">
              <span className="text-uppercase">Мэдээлэл</span>
            </h1>
            <div className="product-bottom-info">
              {attributes.map((attr, index) => {
                return (
                  <div key={index} className="row row10">
                    <dt className="col-sm-3">{attr.value}</dt>
                    <dd className="col-sm-6">{attr.name}</dd>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {!!similarProducts && !!similarProducts.length && (
          <div style={{ marginTop: "80px", marginBottom: "0" }}>
            <h1 className="title">
              <span className="text-uppercase">Ижил бараа</span>
            </h1>
            <div style={{ marginTop: "40px" }}>
              <div className="row row10">
                <CardSlider params={params} data={similarProducts} />
              </div>
            </div>
          </div>
        )}

        {product.description && (
          <div style={{ marginTop: "80px", marginBottom: "0" }}>
            <h1 className="title">
              <span className="text-uppercase">Танилцуулга</span>
            </h1>

            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>
        )}
      </div>
    );
  };

  renderCommentList = () => {
    const { product, comments } = this.props.container;

    return <CommentList comments={comments} product={product} />;
  };

  round = (value, step) => {
    step || (step = 1.0);
    const inv = 1.0 / step;
    return Math.round(value * inv) / inv;
  };

  getRateValue = () => {
    const { product } = this.props.container;

    let average = 0;
    if (product && product.rate && product.rate.length) {
      let total = product.rate.reduce((a, b) => a + b.rate, 0);
      if (total > 0) {
        average = this.round(total / product.rate.length, 0.5);
      }
    }
    return average;
  };

  handleRateChange = e => {
    console.log(e);
  };

  handleQtyChange = e => {
    this.setState({ productQty: e.target.value });
  };

  handleIncrementClick = () => {
    const {
      addminqty,
      availableqty,
      salemaxqty
    } = this.props.container.product;
    const { productQty } = this.state;

    if (availableqty > 0 && availableqty > productQty) {
      if (salemaxqty > productQty || salemaxqty === 0) {
        this.setState({
          productQty:
            productQty < addminqty ? addminqty : productQty + addminqty
        });
      }
    }
  };

  handleDecrementClick = () => {
    const { addminqty, saleminqty } = this.props.container.product;
    const { productQty } = this.state;

    if (saleminqty > 0 && saleminqty < productQty - addminqty) {
      this.setState({
        productQty:
          productQty < saleminqty ? saleminqty : productQty - addminqty
      });
    }
  };

  getPrice = () => {
    const { product } = this.props.container;

    let price = product.price;

    if (product.issalekg && product.kgproduct[0]) {
      price = product.kgproduct[0].salegramprice;
    }

    if (product.spercent && product.spercent !== 100 && !product.issalekg) {
      price = product.sprice;
    }

    return price;
  };

  getTotalPrice = () => {
    return this.state.productQty * this.getPrice();
  };

  handleSaveClick = e => {
    e.preventDefault();

    if (this.props.isLoggedIn && this.props.user) {
      console.log("ready to save");
      // await api.product
      //   .addViewList({ id: this.state.userInfo.id, skucd: this.state.skucd })
      //   .then(res => {
      //     if (res.success) {
      //       this.notify(res.message);
      //     }
      //   });
    } else {
      this.showLoginModal();
    }
  };

  toggleLoginModal = () => {
    this.setState({ isLoginModalVisible: !this.state.isLoginModalVisible });
  };

  showLoginModal = () => {
    this.setState({ isLoginModalVisible: true });
  };

  render() {
    const { categories, product } = this.props.container;

    if (!product) {
      return (
        <center>
          <div>Бараа олдсонгүй</div>
        </center>
      );
    }

    return (
      <div className="section">
        <div className="container">
          <Breadcrumb product={product} categories={categories} />

          <div className="product-detail-page col-md-12 col-sm-12 col-lg-12">
            <div className="row row10">
              <div className="col-sm-9 col-md-9 col-lg-9 row">
                <Gallery images={product.images} />
                {this.renderDetails()}
              </div>
              <div className="col-xl-3 col-lg-3 col-sm-3 col-md-3">
                <div className="product-plus">
                  {this.renderDeliveryInfo()}
                  {this.renderRelatedProducts()}
                </div>
              </div>
              {this.renderMoreInfo()}
              {this.renderCommentList()}
            </div>
          </div>
        </div>

        <LoginModal
          onVisibilityChange={this.toggleLoginModal}
          visible={this.state.isLoginModalVisible}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user
  };
};

export default withCart(
  connect(
    mapStateToProps,
    { updateCart }
  )(ProductDetail)
);
