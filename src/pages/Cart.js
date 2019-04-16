import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createForm } from "rc-form";

import { IMAGE } from "../utils/consts";
import withCart from "../components/HOC/withCart";

class Cart extends React.Component {
  handleQtyChange = product => e => {
    const { products } = this.props.cart;

    const found = products.find(prod => prod.cd === product.cd);
    if (found) {
      found.qty = parseInt(e.target.value || 1);
      const i = products.map(prod => prod.cd).indexOf(found.cd);
      this.setState({ products: products.splice(i, 1, found) });
    }
  };

  handleQtyKeyDown = product => e => {
    if (e.key === "Enter") {
      this.props.onUpdate(product, parseInt(e.target.value));
    }
  };

  handleQtyBlur = product => e => {
    this.props.onUpdate(product, parseInt(e.target.value));
  };

  render() {
    const formatter = new Intl.NumberFormat("en-US");
    const { wishlistProducts, deliveryInfo } = this.props.container;
    const {
      isLoggedIn,
      user,
      cart,
      onIncrement,
      onDecrement,
      onRemove
    } = this.props;
    const { products, totalPrice, totalQty } = cart;

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
              <th className="column-1" style={{ width: "36%" }}>
                <span>Бүтээгдэхүүний нэр</span>
              </th>
              <th className="column-2" style={{ width: "18%" }}>
                Нэгжийн үнэ
              </th>
              <th className="column-3" style={{ width: "24%" }}>
                Тоо ширхэг
              </th>
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
                        <Link to={product.route ? product.route : ""}>
                          <span
                            className="image"
                            style={{
                              backgroundImage: `url(${IMAGE}${
                                product.img
                                  ? product.img
                                  : product.imgnm
                                  ? product.imgnm
                                  : ""
                              })`
                            }}
                          />
                        </Link>
                      </div>
                      <div className="info-container">
                        {console.log(product)}
                        <Link
                          to={product.route ? product.route : ""}
                          style={{ color: "#6c757d" }}
                        >
                          <strong>{product.name}</strong>
                          <span>{product.shortnm}</span>
                        </Link>
                      </div>
                    </div>
                  </td>
                  <td>{price}</td>
                  <td>
                    <form>
                      <div className="input-group e-input-group">
                        <div className="input-group-prepend" id="button-addon4">
                          <button
                            onClick={() => onDecrement(product)}
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
                          name="productQty"
                          maxLength={5}
                          onChange={this.handleQtyChange(product)}
                          onKeyDown={this.handleQtyKeyDown(product)}
                          onBlur={this.handleQtyBlur(product)}
                        />
                        <div className="input-group-append" id="button-addon4">
                          <button
                            onClick={() => onIncrement(product)}
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
                          (product.sprice || product.price) * product.qty
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
                          <button
                            onClick={() => onRemove(product)}
                            className="btn btn-link"
                            type="button"
                          >
                            <i className="fa fa-times" aria-hidden="true" />
                            <span>Устгах</span>
                          </button>
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
                      <span>Нийт бараа: </span>
                      <span>{totalQty}ш</span>
                    </p>
                    {deliveryInfo && (
                      <p className="delivery">
                        <span>Хүргэлт:</span>
                        <span>{deliveryInfo}</span>
                      </p>
                    )}
                    <p className="total flex-space">
                      <span>Нийт дүн:</span>
                      <strong>{formatter.format(totalPrice)}₮</strong>
                    </p>
                    <Link
                      to="/checkout"
                      className={`btn btn-main btn-block${
                        products && products.length ? "" : " disabled"
                      }`}
                    >
                      <span className="text-uppercase">Баталгаажуулах</span>
                    </Link>
                  </div>
                  {isLoggedIn && user && wishlistProducts.length && (
                    <div className="block fav-products">
                      <p className="title">
                        <strong>Хадгалсан бараа</strong>
                      </p>
                      <ul className="list-unstyled">
                        {wishlistProducts.map(product => (
                          <li className="flex-this">
                            <div className="image-container default">
                              <a href="#">
                                <span
                                  className="image"
                                  style={{
                                    backgroundImage: `url(${IMAGE}${
                                      product.img
                                    })`
                                  }}
                                />
                              </a>
                            </div>
                            <div className="info-container">
                              <div className="flex-space">
                                <a href="#">
                                  <div className="text">
                                    <span>{product.skunm}</span>
                                    <strong>
                                      {product.sprice
                                        ? product.sprice
                                        : product.price
                                        ? product.price
                                        : 0}
                                      ₮
                                    </strong>
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
                        ))}
                      </ul>
                      <a href="#" className="btn btn-gray btn-block">
                        <span className="text-uppercase">Бүх барааг үзэх</span>
                      </a>
                    </div>
                  )}
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
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user,
    cart: state.cart
  };
};

export default withCart(connect(mapStateToProps)(createForm()(Cart)));
