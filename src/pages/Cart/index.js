import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../../api";
import storage from "../../utils/storage";
import { IMAGE } from "../../utils/consts";
import { updateCart } from "../../actions/Cart";

class Cart extends React.Component {
  notify = message => toast(message, { autoClose: 5000 });

  increment = item => {
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
        if (res.success) {
          if (found) {
            found.qty++;
            const i = cart.products
              .map(product => product.cd)
              .indexOf(found.cd);
            cart.products.splice(i, 1, found);
          } else {
            item.qty = 1;
            cart.products.push(item);
          }

          const qties = cart.products.map(product => product.qty);
          cart.totalQty = qties.reduce((acc, curr) => acc + curr);

          const prices = cart.products.map(product => {
            const price = product.sprice
              ? product.sprice
              : product.price
              ? product.price
              : 0;
            return product.qty * price;
          });
          cart.totalPrice = prices.reduce((acc, curr) => acc + curr);

          storage.set("cart", cart);

          // TODO: stop page refreshing
          this.props.updateCart({
            products: cart.products,
            totalQty: cart.totalQty,
            totalPrice: cart.totalPrice
          });
        } else {
          this.notify(res.message);
        }
      });
  };

  decrement = item => {
    let cart = storage.get("cart")
      ? storage.get("cart")
      : { products: [], totalQty: 0, totalPrice: 0 };

    const found = cart.products.find(product => product.cd === item.cd);

    if (!found) {
      return;
    }

    const i = cart.products.map(product => product.cd).indexOf(found.cd);
    if (found.qty > 1) {
      found.qty--;
      cart.products.splice(i, 1, found);
    } else {
      cart.products.splice(i, 1);
    }

    const qties = cart.products.map(product => product.qty);
    cart.totalQty = qties.length ? qties.reduce((acc, curr) => acc + curr) : 0;

    const prices = cart.products.map(product => {
      const price = product.sprice
        ? product.sprice
        : product.price
        ? product.price
        : 0;
      return product.qty * price;
    });
    cart.totalPrice = prices.length
      ? prices.reduce((acc, curr) => acc + curr)
      : 0;

    storage.set("cart", cart);

    this.props.updateCart({
      products: cart.products,
      totalQty: cart.totalQty,
      totalPrice: cart.totalPrice
    });
  };

  render() {
    const { wishlistProducts } = this.props.container;
    const formatter = new Intl.NumberFormat("en-US");
    const { products, totalPrice } = this.props;

    let content = (
      <div style={{ textAlign: "center" }}>
        <p>Таны сагс хоосон байна</p>
      </div>
    );

    if (products.length) {
      content = (
        <table className="table table-borderless">
          <thead className="thead-light">
            <tr>
              <th className="column-1">
                <span>Бүтээгдэхүүний нэр</span>
              </th>
              <th className="column-2">Нэгжийн үнэ</th>
              <th className="column-3">Тоо ширхэг</th>
              <th className="column-4">
                <p className="price total">
                  <strong>Барааны үнэ</strong>
                </p>
              </th>
            </tr>
          </thead>
          {products.map((product, index) => {
            const price = product.sprice ? (
              <p className="price">
                <strong>{formatter.format(product.sprice)}₮</strong>
                <br />
                <span
                  style={{
                    fontSize: "0.8em",
                    textDecoration: "line-through",
                    color: "#999"
                  }}
                >
                  {formatter.format(product.price)}
                </span>
              </p>
            ) : (
              <p className="price">
                <strong>{formatter.format(product.price)}₮</strong>
              </p>
            );

            return (
              <tbody key={index}>
                <tr>
                  <td>
                    <div className="flex-this">
                      <div className="image-container default">
                        <span
                          className="image"
                          style={{
                            backgroundImage: `url(${IMAGE + product.img})`
                          }}
                        />
                      </div>
                      <div className="info-container">
                        <strong>{product.name}</strong>
                        <span>{product.shortnm}</span>
                      </div>
                    </div>
                  </td>
                  <td>{price}</td>
                  <td>
                    <form>
                      <div className="input-group e-input-group">
                        <div className="input-group-prepend" id="button-addon4">
                          <button
                            onClick={() => this.decrement(product)}
                            className="btn"
                            type="button"
                          >
                            <i className="fa fa-minus" aria-hidden="true" />
                          </button>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          value={product.qty}
                          aria-label=""
                          aria-describedby="button-addon4"
                        />
                        <div className="input-group-append" id="button-addon4">
                          <button
                            onClick={() => this.increment(product)}
                            className="btn"
                            type="button"
                          >
                            <i className="fa fa-plus" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </form>
                  </td>
                  <td>
                    <p className="price total">
                      <strong>
                        {formatter.format(
                          (product.sprice ? product.sprice : product.price) *
                            product.qty
                        )}
                        ₮
                      </strong>
                    </p>
                  </td>
                </tr>
                <tr className="table-action">
                  <td colSpan="5">
                    <div className="text-right single-action">
                      <ul className="list-unstyled">
                        <li>
                          <a href="#">
                            <i className="fa fa-heart" aria-hidden="true" />
                            <span>Хадгалах</span>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-times" aria-hidden="true" />
                            <span>Устгах</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      );
    }

    return (
      <div className="section">
        <div className="container pad10">
          <div className="cart-container">
            <Link to="/" className="btn btn-gray">
              <span className="text-uppercase">Дэлгүүрлүү буцах</span>
            </Link>
            <h1 className="title">
              <span className="text-uppercase">Миний сагс</span>
            </h1>
            <div className="row row10">
              <div className="col-xl-8 col-lg-8 pad10">
                <h5 className="title">
                  <span>Сагсан дахь бараанууд</span>
                </h5>
                <div className="cart-table table-responsive">{content}</div>
              </div>
              <div className="col-xl-4 col-lg-4 pad10">
                <div className="cart-info">
                  <h5 className="title">
                    <span>Төлбөр</span>
                  </h5>
                  <div className="block cart-info-container">
                    <p className="count">
                      <span>Нийт бараа:</span>
                      <span>1ш</span>
                    </p>
                    <p className="delivery">
                      <span>Хүргэлт:</span>
                      <span>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Integer id justo mi. Maecenas vel lectus id erat euismod
                        porta sed in felis. In massa mi, ornare vel sem eu,
                        cursus vehicula leo. Curabitur vestibulum nisi at lacus
                        dictum, non eleifend eros ullamcorper.{" "}
                      </span>
                    </p>
                    <p className="total flex-space">
                      <span>Нийт дүн:</span>
                      <strong>{formatter.format(totalPrice)}₮</strong>
                    </p>
                    <Link to="/checkout" className="btn btn-main btn-block">
                      <span className="text-uppercase">Баталгаажуулах1</span>
                    </Link>
                  </div>
                  <div className="block fav-products">
                    <p className="title">
                      <strong>Хадгалсан бараа</strong>
                    </p>
                    <ul className="list-unstyled">
                      <li className="flex-this">
                        <div className="image-container default">
                          <a href="#">
                            <span
                              className="image"
                              style={{ backgroundImage: `url(${IMAGE})` }}
                            />
                          </a>
                        </div>
                        <div className="info-container">
                          <div className="flex-space">
                            <a href="#">
                              <div className="text">
                                <span>Өндөг 10ш</span>
                                <strong>3,200₮</strong>
                              </div>
                            </a>
                            <a href="#">
                              <div className="action">
                                <i
                                  className="fa fa-cart-plus"
                                  aria-hidden="true"
                                />
                              </div>
                            </a>
                          </div>
                        </div>
                      </li>
                      <li className="flex-this">
                        <div className="image-container default">
                          <a href="#">
                            <span
                              className="image"
                              style={{ backgroundImage: `url(${IMAGE})` }}
                            />
                          </a>
                        </div>
                        <div className="info-container">
                          <div className="flex-space">
                            <a href="#">
                              <div className="text">
                                <span>Өндөг 10ш</span>
                                <strong>3,200₮</strong>
                              </div>
                            </a>
                            <a href="#">
                              <div className="action">
                                <i
                                  className="fa fa-cart-plus"
                                  aria-hidden="true"
                                />
                              </div>
                            </a>
                          </div>
                        </div>
                      </li>
                      <li className="flex-this">
                        <div className="image-container default">
                          <a href="#">
                            <span
                              className="image"
                              style={{ backgroundImage: `url(${IMAGE})` }}
                            />
                          </a>
                        </div>
                        <div className="info-container">
                          <div className="flex-space">
                            <a href="#">
                              <div className="text">
                                <span>Өндөг 10ш</span>
                                <strong>3,200₮</strong>
                              </div>
                            </a>
                            <a href="#">
                              <div className="action">
                                <i
                                  className="fa fa-cart-plus"
                                  aria-hidden="true"
                                />
                              </div>
                            </a>
                          </div>
                        </div>
                      </li>
                      <li className="flex-this">
                        <div className="image-container default">
                          <a href="#">
                            <span
                              className="image"
                              style={{ backgroundImage: `url(${IMAGE})` }}
                            />
                          </a>
                        </div>
                        <div className="info-container">
                          <div className="flex-space">
                            <a href="#">
                              <div className="text">
                                <span>Өндөг 10ш</span>
                                <strong>3,200₮</strong>
                              </div>
                            </a>
                            <a href="#">
                              <div className="action">
                                <i
                                  className="fa fa-cart-plus"
                                  aria-hidden="true"
                                />
                              </div>
                            </a>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <a href="#" className="btn btn-gray btn-block">
                      <span className="text-uppercase">Бүх барааг үзэх</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.cart.products || [],
    totalPrice: state.cart.totalPriceInCart || 0
  };
};

export default connect(
  mapStateToProps,
  { updateCart }
)(Cart);
