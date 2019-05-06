import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { IMAGE } from "../../utils/consts";
import { updateCart } from "../../actions/cart";
import withCart from "../../components/HOC/withCart";
import Slider from "../../components/Slider";

import "./detail.css";

const formatter = new Intl.NumberFormat("en-US");

class PackageDetail extends React.Component {
  state = {
    products: this.props.container.products.products || []
  };

  componentDidMount() {
    let tempProducts = this.state.products;

    tempProducts && tempProducts.forEach(product => {
      product.qty = product.saleminqty || 1;
    });

    this.setState({ products: tempProducts });
  }

  handleAddToCartClick = product => {
    if (product) {
      this.props.onUpdateCart(product);
    } else {
      const { products } = this.state;

      if (products.length) {
        products.reduce((acc, next) => {
          return acc.then(() => {
            return this.props.onUpdateCart(next);
          });
        }, Promise.resolve());
      }
    }
  };

  findAndReplace = product => {
    const { products } = this.state;

    let tempProducts = products;
    const i = tempProducts.map(prod => prod.cd).indexOf(product.cd);

    if (i !== -1) {
      tempProducts.splice(i, 1, product);
    }

    this.setState({ products: tempProducts });
  };

  handleIncrementClick = product => {
    product = this.props.onIncrement(product);
    this.findAndReplace(product);
  };

  handleDecrementClick = product => {
    product = this.props.onDecrement(product);
    this.findAndReplace(product);
  };

  handleQtyChange = product => e => {
    product.qty = parseInt(e.target.value);
    this.findAndReplace(product);
  };

  handleQtyKeyDown = product => e => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.changeQty(product, parseInt(e.target.value));
    }
  };

  handleQtyBlur = product => e => {
    this.changeQty(product, parseInt(e.target.value));
  };

  changeQty = (product, targetQty) => {
    product = this.props.onQtyChange(product, targetQty);
    this.findAndReplace(product);
  };

  renderDate = dateString => {
    const dateParts = dateString.split("T")[0].split("-");

    return (
      <p className="date">
        <span>
          {`${dateParts[0]} оны ${dateParts[1]} сарын ${dateParts[2]}`}
        </span>
      </p>
    );
  };

  renderSimilarProducts = () => {
    const similarProducts = this.props.container.products.sameproducts || [];

    return (
      similarProducts && !!similarProducts.length && (
        <div className="block product-suggest">
          <p className="title">
            <strong>Ижил бараа</strong>
          </p>

          <ul className="list-unstyled">
            {similarProducts.map((product, index) => {
              return (
                <li key={index}>
                  <div className="single flex-this">
                    <div className="image-container">
                      <Link to={product.route || ""}>
                        <span
                          className="image"
                          style={{
                            backgroundImage: `url(${IMAGE}${product.url})`
                          }}
                        />
                      </Link>
                    </div>

                    <div className="info-container flex-space">
                      <Link to={product.route || ""}>
                        <span>{product.skunm}</span>
                        <strong>
                          {formatter.format(product.sprice || product.price)}₮
                        </strong>
                      </Link>
                      <div className="action">
                        <button
                          type="button"
                          className="btn btn-link"
                          onClick={() => this.handleAddToCartClick(product)}
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
        </div>
      )
    );
  };

  renderCartInfo = () => {
    const { products } = this.state;

    return (
      <div className="pack-product-container" style={{ marginTop: "30px" }}>
        {products && products.length && (
          <div className="pack-list">
            <div className="row row10">
              <div className="col-xl-8 pad10">
                <ul className="list-unstyled">
                  {products.map((product, index) => (
                    <li className="flex-this" key={index}>
                      <div className="image-container default">
                        <Link to={product.route || ""}>
                          <span
                            className="image"
                            style={{
                              backgroundImage: `url(${IMAGE}${product.img})`
                            }}
                          />
                        </Link>
                      </div>

                      <div className="info-container">
                        <div className="flex-space">
                          <p className="text col-md-5 col-sm-5">
                            <Link
                              to={product.route || ""}
                              style={{ color: "#666" }}
                            >
                              <span>{product.name}</span>
                              <strong>
                                {formatter.format(
                                  this.props.getUnitPrice(product).sprice ||
                                    this.props.getUnitPrice(product).price
                                )}
                                ₮
                              </strong>
                            </Link>
                          </p>

                          <form style={{ width: "130px" }}>
                            <div className="input-group e-input-group">
                              <div
                                className="input-group-prepend"
                                id="button-addon4"
                              >
                                <button
                                  className="btn"
                                  type="button"
                                  style={{
                                    color: "rgba(0,0,0,.5)",
                                    textAlign: "center",
                                    backgroundColor: "rgb(204, 204, 204)",
                                    borderTopLeftRadius: "20px",
                                    borderBottomLeftRadius: "20px",
                                    marginRight: "5px"
                                  }}
                                  onClick={() =>
                                    this.handleDecrementClick(product)
                                  }
                                >
                                  <i
                                    className="fa fa-minus"
                                    aria-hidden="true"
                                  />
                                </button>
                              </div>
                              <input
                                type="text"
                                className="form-control"
                                value={product.qty}
                                name="productQty"
                                maxLength={5}
                                onChange={this.handleQtyChange(product)}
                                onKeyDown={this.handleQtyKeyDown(product)}
                                onBlur={this.handleQtyBlur(product)}
                              />
                              <div
                                className="input-group-append"
                                id="button-addon4"
                              >
                                <button
                                  className="btn"
                                  type="button"
                                  style={{
                                    color: "rgba(0,0,0,.5)",
                                    textAlign: "center",
                                    backgroundColor: "rgb(204, 204, 204)",
                                    borderTopRightRadius: "20px",
                                    borderBottomRightRadius: "20px",
                                    marginLeft: "5px"
                                  }}
                                  onClick={() =>
                                    this.handleIncrementClick(product)
                                  }
                                >
                                  <i
                                    className="fa fa-plus"
                                    aria-hidden="true"
                                  />
                                </button>
                              </div>
                            </div>
                          </form>

                          <div className="action">
                            <button
                              className="btn btn-link"
                              type="button"
                              onClick={() => this.handleAddToCartClick(product)}
                            >
                              <i
                                className="fa fa-cart-plus"
                                aria-hidden="true"
                                style={{ fontSize: "1.6rem" }}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-xl-4 pad10">
                <div className="pack-price">
                  <p className="text flex-this end">
                    <span style={{ fontSize: "1.6rem" }}>Үнэ:</span>
                    {this.renderTotalPrice()}
                  </p>

                  <button
                    type="button"
                    className="btn btn-main"
                    onClick={() => this.handleAddToCartClick()}
                  >
                    <i
                      className="fa fa-cart-plus"
                      aria-hidden="true"
                      style={{ fontSize: "1.2rem" }}
                    />{" "}
                    <span className="text-uppercase">Сагсанд нэмэх</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="info-container" style={{ float: "right" }}>
          <span>
            <i>
              Та багцаас сонгож авахгүй барааныхаа тоо хэмжээг 0 болгосноор
              багцаас хасаад сагсанд нэмэх боломжтой.
            </i>
          </span>
        </div>
      </div>
    );
  };

  renderTotalPrice = () => {
    const totalPrice = this.state.products.reduce(
      (acc, curr) =>
        acc +
        curr.qty *
          (this.props.getUnitPrice(curr).sprice ||
            this.props.getUnitPrice(curr).price),
      0
    );

    return <strong>{formatter.format(totalPrice)}₮</strong>;
  };

  render() {
    const packageInfo = this.props.container.packageInfo.products[0];
    const images = this.props.container.packageInfo.images;

    const sliderParams = {
      spaceBetween: 0,
      autoplay: {
        delay: 10000,
        disableOnInteraction: false
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true
      }
    };

    return (
      <div className="section">
        <div className="container pad10">
          <div className="e-breadcrumb">
            <ul className="list-unstyled">
              <li>
                <Link to="">
                  <span>Нүүр хуудас</span>
                </Link>
              </li>
              <li>
                <Link to="/package">
                  <span>Багц</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="product-detail-page">
            <div className="row row10">
              <div className="col-xl-9 col-md-8 pad10">
                <h4 className="title">
                  <span>{packageInfo.packagenm}</span>
                </h4>

                {this.renderDate(packageInfo.insymd)}

                <div className="content">
                  {!!images.length && (
                    <div
                      className="main-slide"
                      style={{ marginBottom: "30px" }}
                    >
                      <Slider
                        data={images}
                        params={sliderParams}
                        elContainer={"images"}
                      />
                    </div>
                  )}

                  <div
                    style={{ lineHeight: "200%" }}
                    className="product-plus htmlcontainer"
                    dangerouslySetInnerHTML={{
                      __html: packageInfo.description
                    }}
                  />
                </div>

                {this.renderCartInfo()}
              </div>

              <div className="col-xl-3 col-md-4 pad10">
                <div className="product-plus">
                  {packageInfo.deliverytxt && (
                    <div className="block product-delivery">
                      <p className="title">
                        <strong>Хүргэлтийн мэдээлэл</strong>
                      </p>
                      <p className="text">
                        <span>{packageInfo.deliverytxt}</span>
                      </p>
                    </div>
                  )}

                  {this.renderSimilarProducts()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withCart(
  connect(
    null,
    { updateCart }
  )(PackageDetail)
);
