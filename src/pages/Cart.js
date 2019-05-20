import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createForm } from "rc-form";
import clonedeep from "lodash.clonedeep";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import api from "../api";
import { IMAGE } from "../utils/consts";
import withCart from "../components/HOC/withCart";
import { updateCart } from "../actions/cart";

const formatter = new Intl.NumberFormat("en-US");

class Cart extends React.Component {
  state = { products: [] };

  componentDidMount() {
    if (this.props.isLoggedIn && this.props.user) {
      api.cart.findAllProducts({ custid: this.props.user.id }).then(res => {
        if (res.success) {
          this.setState({ products: res.data });
        } else {
          this.setState({ products: this.props.cart.products });
        }
      });
    } else {
      this.setState({ products: this.props.cart.products });
    }
  }

  handleIncrementClick = product => {
    this.props.onIncrement(product);
    this.props.onUpdateCart(product, true);
  };

  handleDecrementClick = product => {
    this.props.onDecrement(product);
    this.props.onUpdateCart(product, true);
  };

  handleQtyChange = product => e => {
    if (isNaN(e.target.value)) {
      product.qty = product.addminqty;
    } else {
      if (e.target.value < product.addminqty) {
        product.qty = product.addminqty;
      } else {
        product.qty = parseInt(e.target.value);
      }
    }
    this.findAndReplace(product);
  };

  handleQtyKeyDown = product => e => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.changeQty(product);
    }
  };

  handleQtyBlur = product => e => {
    this.changeQty(product);
  };

  changeQty = product => {
    this.props.onQtyChange(product);
    this.props.onUpdateCart(product, true);
    this.findAndReplace(product);
  };

  handleRemoveClick = product => e => {
    e.preventDefault();
    this.props.onRemove(product);
  };

  findAndReplace = product => {
    let tempProducts = clonedeep(this.state.products);

    const i = tempProducts.map(tempProd => tempProd.cd).indexOf(product.cd);

    if (i !== -1) {
      tempProducts.splice(i, 1, product);
    }

    this.setState({ products: tempProducts });
  };

  renderUnitPrice = product => {
    const { getUnitPrice } = this.props;

    if (product.sprice) {
      if (product.issalekg && product.kgproduct[0]) {
        return (
          <p className="price">
            <strong>{formatter.format(getUnitPrice(product).sprice)}₮</strong>
          </p>
        );
      }

      return (
        <p className="price">
          <strong>{formatter.format(getUnitPrice(product).sprice)}₮</strong>
          <br />
          <span
            style={{
              fontSize: "0.8em",
              textDecoration: "line-through",
              color: "#999"
            }}
          >
            {formatter.format(getUnitPrice(product).price)}
          </span>
        </p>
      );
    }

    if (product.issalekg && product.kgproduct[0]) {
      return (
        <p className="price">
          <strong>{formatter.format(getUnitPrice(product).price)}₮</strong>
        </p>
      );
    }

    return (
      <p className="price">
        <strong>{formatter.format(getUnitPrice(product).price)}₮</strong>
      </p>
    );
  };

  renderTotalPrice = product => {
    const { getUnitPrice } = this.props;

    const price = getUnitPrice(product).sprice || getUnitPrice(product).price;

    return (
      <p className="price total">
        <strong>{formatter.format(price * product.qty)}₮</strong>
      </p>
    );
  };

  render() {
    const { deliveryInfo } = this.props.container;
    const { products } = this.state;

    console.log({ products });

    let content = (
      <div style={{ textAlign: "center" }}>
        <FontAwesomeIcon icon={["fas", "shopping-basket"]} /> Таны сагс хоосон
        байна
      </div>
    );

    if (products && products.length) {
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
          {products.map((prod, index) => {
            return (
              <tbody key={index}>
                <tr>
                  <td>
                    <div className="flex-this">
                      <div className="image-container default">
                        <Link to={prod.route || ""}>
                          <span
                            className="image"
                            style={{
                              backgroundImage: `url(${IMAGE}${prod.img || ""})`
                            }}
                          />
                        </Link>
                      </div>
                      <div className="info-container">
                        <Link
                          to={prod.route || ""}
                          style={{ color: "#6c757d" }}
                        >
                          <strong>{prod.name}</strong>
                          <span>{prod.featuretxt || ""}</span>
                        </Link>
                      </div>
                    </div>
                  </td>
                  <td>{this.renderUnitPrice(prod)}</td>
                  <td>
                    <form>
                      <div className="input-group e-input-group">
                        <div className="input-group-prepend" id="button-addon4">
                          <button
                            onClick={() => this.handleDecrementClick(prod)}
                            className="btn"
                            type="button"
                          >
                            <i className="fa fa-minus" aria-hidden="true" />
                          </button>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          value={prod.qty}
                          name="productQty"
                          maxLength={5}
                          onChange={this.handleQtyChange(prod)}
                          onKeyDown={this.handleQtyKeyDown(prod)}
                          onBlur={this.handleQtyBlur(prod)}
                        />
                        <div className="input-group-append" id="button-addon4">
                          <button
                            onClick={() => this.handleIncrementClick(prod)}
                            className="btn"
                            type="button"
                          >
                            <i className="fa fa-plus" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </form>
                  </td>
                  <td>{this.renderTotalPrice(prod)}</td>
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
                            type="button"
                            className="btn btn-link"
                            onClick={this.handleRemoveClick(prod)}
                          >
                            <i className="fa fa-times" aria-hidden="true" />{" "}
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

    let wishlistInfo = null;
    if (this.props.isLoggedIn && this.props.user) {
      const { wishlistProducts } = this.props.container;

      wishlistInfo = (
        <div className="block fav-products">
          <p className="title">
            <strong>Хадгалсан бараа</strong>
          </p>
          <ul className="list-unstyled">
            {!!wishlistProducts &&
              !!wishlistProducts.length &&
              wishlistProducts.map((wishlistProd, index) => (
                <li className="flex-this" key={index}>
                  <div className="image-container default">
                    <a href="#">
                      <span
                        className="image"
                        style={{
                          backgroundImage: `url(${IMAGE}${wishlistProd.img})`
                        }}
                      />
                    </a>
                  </div>
                  <div className="info-container">
                    <div className="flex-space">
                      <a href="#">
                        <div className="text">
                          <span>{wishlistProd.skunm}</span>
                          <strong>
                            {wishlistProd.sprice
                              ? wishlistProd.sprice
                              : wishlistProd.price
                              ? wishlistProd.price
                              : 0}
                            ₮
                          </strong>
                        </div>
                      </a>
                      <a href="#">
                        <div className="action">
                          <i className="fa fa-cart-plus" aria-hidden="true" />
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
      );
    }

    return (
      <div className="section">
        <div className="container pad10">
          <div className="cart-container">
            <Link to="/" className="btn btn-gray">
              <span className="text-uppercase">Нүүр хуудас руу буцах</span>
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
                      <span>{this.props.cart.totalQty}ш</span>
                    </p>
                    {deliveryInfo && (
                      <p className="delivery">
                        <span>Хүргэлт:</span>
                        <span>{deliveryInfo}</span>
                      </p>
                    )}
                    <p className="total flex-space">
                      <span>Нийт дүн:</span>
                      <strong>
                        {formatter.format(this.props.cart.totalPrice)}₮
                      </strong>
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
                  {wishlistInfo}
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

export default withCart(
  connect(
    mapStateToProps,
    { updateCart }
  )(createForm()(Cart))
);
