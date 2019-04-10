import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createForm } from "rc-form";

import { IMAGE } from "../utils/consts";
import withCart from "../components/HOC/withCart";

class Cart extends React.Component {
  render() {
    const formatter = new Intl.NumberFormat("en-US");
    const {
      products,
      totalPrice,
      onIncrement,
      onDecrement,
      onRemove,
      onUpdate
    } = this.props;

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
                          onChange={() => onUpdate(product)}
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

export default withCart(connect(mapStateToProps)(createForm()(Cart)));
