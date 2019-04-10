import React from "react";
import { Link } from "react-router-dom";
import { IMAGE } from "../../utils/consts";
import Slider from "../../components/Slider";
import { connect } from "react-redux";

import { toast } from "react-toastify";
import storage from "../../utils/storage";
import api from "../../api";
import { updateCart } from "../../actions/cart";
import { MapsRestaurantMenu } from "material-ui/svg-icons";

class PackageDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: this.props.container.Products[0].products,
      price: parseInt(this.props.container.Products[0].total),
      sameProducts: this.props.container.Products[0].sameproducts,
      addProduct: null,
      remProduct: null,
      images: this.props.container.Package.images,
      description: this.props.container.Package.products[0].description,
      title: this.props.container.Package.products[0].packagenm,
      deliveryText: this.props.container.Package.products[0].deliverytxt,
      date: this.props.container.Package.products[0].insymd
        .split("T")[0]
        .split("-"),
      id: this.props.container.Package.products[0]
    };
  }

  notify = message => toast(message, { autoClose: 5000 });

  add = prod => {
    let cart = storage.get("cart")
      ? storage.get("cart")
      : { products: [], totalQty: 0, totalPrice: 0 };
    if (prod.length) {
      prod.map(item => {
        const found = cart.products.find(product => product.cd === item.cd);
        if (parseInt(item.unit) === 0) {
          return;
        } else {
          let itemQty = 0;
          if (found) {
            itemQty = parseInt(found.qty) + parseInt(item.unit);
          } else {
            itemQty = item.unit;
          }
          return new Promise((resolve, reject) => {
            api.product
              .isAvailable({
                skucd: item.cd,
                qty: itemQty
              })
              .then(res => {
                if (res.success) {
                  if (found) {
                    found.qty = itemQty;
                    const i = cart.products
                      .map(product => product.cd)
                      .indexOf(found.cd);
                    cart.products.splice(i, 1, found);
                  } else {
                    item.qty = itemQty;
                    cart.products.push(item);
                  }
                  const qties = cart.products.map(product => product.qty);
                  cart.totalQty = qties.reduce(
                    (acc, curr) => parseInt(acc) + parseInt(curr)
                  );
                  const prices = cart.products.map(product => {
                    const price = product.sprice
                      ? product.sprice
                      : product.price
                      ? product.price
                      : 0;
                    return product.qty * price;
                  });
                  cart.totalPrice = prices.reduce(
                    (acc, curr) => parseInt(acc) + parseInt(curr)
                  );
                  storage.set("cart", cart);
                  this.props.updateCart({
                    products: cart.products,
                    totalQty: cart.totalQty,
                    totalPrice: cart.totalPrice
                  });
                  let tot = parseInt(item.unit) * parseInt(item.tprice);
                  this.notify(
                    "Таны сагсанд " +
                      item.unit +
                      "ш " +
                      item.skunm +
                      " бүтээгдэхүүн нэмэгдлээ." +
                      "Үнийн дүн:" +
                      parseInt(tot)
                  );
                  resolve();
                } else {
                  this.notify(
                    "Таны сонгосон багцын " +
                      item.unit +
                      "-" +
                      item.skunm +
                      " бараа дууссан байгаа тул худалдан авалт хийх боломжгүй байна."
                  );
                  reject();
                }
              });
          });
        }
      });
    } else {
      const found = cart.products.find(product => product.cd === prod.cd);
      if (parseInt(prod.unit) === 0) {
        return;
      } else {
        let itemQty = 0;
        if (found) {
          itemQty = parseInt(found.qty) + parseInt(prod.unit);
        } else {
          itemQty = parseInt(prod.unit);
        }
        return new Promise((resolve, reject) => {
          api.product
            .isAvailable({
              skucd: prod.cd,
              qty: itemQty
            })
            .then(res => {
              if (res.success) {
                if (found) {
                  found.qty = itemQty;
                  const i = cart.products
                    .map(product => product.cd)
                    .indexOf(found.cd);
                  cart.products.splice(i, 1, found);
                } else {
                  prod.qty = itemQty;
                  cart.products.push(prod);
                }
                const qties = cart.products.map(product => product.qty);
                cart.totalQty = qties.reduce(
                  (acc, curr) => parseInt(acc) + parseInt(curr)
                );
                const prices = cart.products.map(product => {
                  const price = product.sprice
                    ? product.sprice
                    : product.price
                    ? product.price
                    : 0;
                  return product.qty * price;
                });
                cart.totalPrice = prices.reduce(
                  (acc, curr) => parseInt(acc) + parseInt(curr)
                );
                storage.set("cart", cart);
                this.props.updateCart({
                  products: cart.products,
                  totalQty: cart.totalQty,
                  totalPrice: cart.totalPrice
                });
                let tot = parseInt(prod.unit) * parseInt(prod.tprice);
                this.notify(
                  "Таны сагсанд " +
                    prod.unit +
                    "ш " +
                    prod.skunm +
                    " бүтээгдэхүүн нэмэгдлээ." +
                    "Үнийн дүн:" +
                    parseInt(tot)
                );
                resolve();
              } else {
                this.notify(
                  "Таны сонгосон багцын " +
                    prod.unit +
                    "-" +
                    prod.skunm +
                    " бараа дууссан байгаа тул худалдан авалт хийх боломжгүй байна."
                );
                reject();
              }
            });
        });
      }
    }
  };

  handleAddToCart = item => e => {
    e.preventDefault();
    let products = [];
    if (item.recipeid) {
      api.recipe.findAllProducts({ id: item.recipeid }).then(res => {
        if (res.success) {
          products = res.data[0].products;
          if (products.length) {
            products.reduce((acc, next) => {
              return acc.then(() => {
                return this.add(next);
              });
            }, Promise.resolve());
          }
        } else {
          this.notify(res.message);
        }
      });
    } else if (item.packageid) {
      this.add(this.state.products);
    } else {
      this.add(item);
    }
  };

  handleSingleAddToCart = item => e => {
    this.add(item);
  };

  onChange = (e, minus) => {
    e.preventDefault();
    let tmp = [];
    this.state.products.map(item => {
      if (parseInt(item.unit) > 0) {
        if (item.cd === minus.cd) {
          item.unit = e.target.value;
        }
      }
      tmp.push(item);
    });
    this.setState({ products: tmp });
  };

  plusProduct = (e, plus) => {
    e.preventDefault();
    let tmp = [];
    let total = 0;
    let tot = 0;
    this.state.products.map(item => {
      if (item.cd === plus.cd) {
        if (item.availableqty > item.unit && item.salemaxqty > item.unit) {
          item.unit = parseInt(item.unit) + 1;
        } else {
          if (item.salemaxqty === 0) {
            item.unit = parseInt(item.unit) + 1;
          } else {
            this.notify(
              "Уучлаарай тухайн барааг худалдан авах дээд хязгаарт хүрсэн байна."
            );
          }
        }
      }
      tot = parseInt(item.unit) * parseInt(item.tprice);
      total = parseInt(total) + parseInt(tot);
      tmp.push(item);
    });
    this.setState({ products: tmp, price: total });
  };

  minusProduct = (e, minus) => {
    e.preventDefault();
    let tmp = [];
    let total = 0;
    let tot = 0;
    this.state.products.map(item => {
      if (parseInt(item.unit) > 0) {
        if (item.cd === minus.cd) {
          item.unit = parseInt(item.unit) - 1;
        }
      }
      tot = parseInt(item.unit) * parseInt(item.tprice);
      total = parseInt(total) + parseInt(tot);
      tmp.push(item);
    });
    this.setState({ products: tmp, price: total });
  };

  render() {
    console.log("props", this.props);
    const formatter = new Intl.NumberFormat("en-US");
    const sameproduct = this.props.container.Products[0].sameproducts;
    let products = null;
    let sameProducts = null;
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
    // Багцад орсон барааны ижил бараанууд
    console.log("sameproduct", sameproduct.length);
    if (sameproduct.length > 0) {
      sameProducts = (
        <div className="block product-suggest">
          <p className="title">
            <strong>Ижил бараа</strong>
          </p>
          <ul className="list-unstyled">
            {sameproduct.map((item, index) => {
              return (
                <li key={index}>
                  <div className="single flex-this">
                    <div className="image-container">
                      <Link to={item.route ? item.route : " "}>
                        <span
                          className="image"
                          style={{
                            backgroundImage: `url(${IMAGE + item.url})`
                          }}
                        />
                      </Link>
                    </div>
                    <div className="info-container flex-space">
                      <Link to="">
                        <span>{item.skunm}</span>
                        <strong>
                          {formatter.format(
                            item.price1 ? item.price1 : item.price2
                          )}
                          ₮
                        </strong>
                      </Link>
                      <div className="action">
                        <a onClick={this.handleSingleAddToCart(item)}>
                          <i className="fa fa-cart-plus" aria-hidden="true" />
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }

    // Багцад орсон бараанууд
    products = this.state.products.map((item, index) => {
      return (
        <li className="flex-this" key={index}>
          <div className="image-container default">
            <Link to={item.route ? item.route : " "}>
              <span
                className="image"
                style={{
                  backgroundImage: `url(${IMAGE + item.img})`
                }}
              />
            </Link>
          </div>
          <div className="info-container">
            <div className="flex-space">
              <p className="text col-md-5 col-sm-5">
                <span>{item.skunm}</span>
                <strong>{formatter.format(item.tprice)}₮</strong>
              </p>
              <form style={{ width: "100px" }}>
                <div className="input-group e-input-group">
                  <div className="input-group-prepend" id="button-addon4">
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
                      onClick={e => this.minusProduct(e, item)}
                    >
                      <i className="fa fa-minus" aria-hidden="true" />
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    value={item.unit}
                    aria-label=""
                    aria-describedby="button-addon4"
                    style={{ width: "40px" }}
                  />
                  <div className="input-group-append" id="button-addon4">
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
                      onClick={e => this.plusProduct(e, item)}
                    >
                      <i className="fa fa-plus" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </form>
              <div className="action">
                <a onClick={this.handleSingleAddToCart(item)}>
                  <i className="fa fa-cart-plus" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </li>
      );
    });

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
              <li>
                <span>{this.state.title}</span>
              </li>
            </ul>
          </div>
          <div className="product-detail-page">
            <div className="row row10">
              <div className="col-xl-9 col-md-8 pad10">
                <h4 className="title">
                  <span>{this.state.title}</span>
                </h4>
                <p className="date">
                  <span>{`${this.state.date[0]} оны ${
                    this.state.date[1]
                  } сарын ${this.state.date[2]}`}</span>
                </p>
                <div className="content">
                  <div className="main-slide">
                    <Slider
                      data={this.state.images}
                      params={sliderParams}
                      elContainer={"images"}
                    />
                  </div>
                  <div className="product-plus">
                    <br />
                    <div
                      dangerouslySetInnerHTML={{
                        __html: this.state.description
                      }}
                    />
                  </div>
                </div>
                <div className="pack-product-container">
                  <div className="pack-list">
                    <div className="row row10">
                      <div className="col-xl-8 pad10">
                        <ul className="list-unstyled">{products}</ul>
                      </div>
                      <div className="col-xl-4 pad10">
                        <div className="pack-price">
                          <p className="text flex-this end">
                            <span>Дүн:</span>
                            <strong>
                              {formatter.format(this.state.price)}₮
                            </strong>
                          </p>
                          <a
                            href=" "
                            className="btn btn-main"
                            onClick={this.handleAddToCart(this.state.id)}
                          >
                            <i className="fa fa-cart-plus" aria-hidden="true" />
                            <span className="text-uppercase">
                              {" "}
                              Сагсанд нэмэх
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="info-container" style={{ float: "right" }}>
                    <span>
                      <i>
                        Та багцаас сонгож авахгүй барааныхаа тоо хэмжээг 0
                        болгосноор багцаас хасаад сагсанд нэмэх боломжтой.
                      </i>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-4 pad10">
                <div className="product-plus">
                  <div className="block product-delivery">
                    <p className="title">
                      <strong>Хүргэлтийн мэдээлэл</strong>
                    </p>
                    <p className="text">
                      <span>{this.state.deliveryText}</span>
                    </p>
                  </div>
                  {sameProducts}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { updateCart }
)(PackageDetail);
