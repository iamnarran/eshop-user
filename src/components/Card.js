import React from "react";
import { connect } from "react-redux";
import { Link, Icon } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { getFeedbacks } from "../actions/mainlogic";
import api from "../api";
import Rate from "./Rate";
import Label from "./Label";
import storage from "../utils/storage";
import { updateCart } from "../actions/Cart";
import { IMAGE, CARD_TYPES } from "../utils/consts";

import "./Card.css";

// const Msg = message => (
//   <div className="warning">
//     <Icon type="warning" />
//     <p>{message}</p>
//   </div>
// );

class Card extends React.Component {
  state = {
    checkProduct: []
  };
  notify = message => toast(message, { autoClose: 5000 });

  handleAddToCart = item => e => {
    e.preventDefault();
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

    /*  api.product
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
      }); */
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

  trimByWord(text, maxChars = 20) {
    const textWords = text.split(" ");
    const textWordsCount = textWords.length;

    if (textWordsCount <= maxChars) {
      return text;
    }

    let trimmed = text.substr(0, maxChars);
    trimmed = trimmed.substr(
      0,
      Math.min(trimmed.length, trimmed.lastIndexOf(" "))
    );

    return `${trimmed}...`;
  }

  render() {
    const { type, item, isLastInRow, className } = this.props;

    if (!item) {
      return null;
    }
    const formatter = new Intl.NumberFormat("en-US");

    let prices = (
      <span className="current">{formatter.format(item.price)}₮</span>
    );

    if (item.sprice) {
      prices = (
        <div>
          <small className="sale">{formatter.format(item.price)}₮</small>
          <span className="current">{formatter.format(item.sprice)}₮</span>
        </div>
      );
    }

    const hover = (
      <div className="search-hover">
        <Link to="">
          <i className="fa fa-heart-o" aria-hidden="true" />
          <span />
        </Link>
        <a onClick={this.handleAddToCart(item)}>
          <i className="fa fa-cart-plus" aria-hidden="true" />
          <span />
        </a>
      </div>
    );

    switch (type) {
      case CARD_TYPES.slim:
        return (
          <div
            className={`col-five pad10${
              isLastInRow ? " d-none d-xl-block lol" : " col-md-3 col-6"
            }`}
          >
            <div className="single-product small-product sale-product timed-product">
              <div className="image-container">
                <Link to={item.route ? item.route : ""}>
                  <span
                    className="image"
                    style={{
                      backgroundImage: `url(${IMAGE + item.img})`
                    }}
                  />
                </Link>
                {item.tags &&
                  item.tags.map((label, index) => (
                    <Label key={index} seq={index} data={label} />
                  ))}
                {hover}
              </div>
              <div className="info-container">
                <Link to={item.route ? item.route : ""} className="name">
                  <span>
                    {item.name
                      ? this.trimByWord(item.name)
                      : item.packagenm
                      ? this.trimByWord(item.packagenm)
                      : ""}
                  </span>
                </Link>
                <Link to={item.route ? item.route : ""} className="cat">
                  <span>
                    {item.shortnm
                      ? this.trimByWord(item.shortnm, 30)
                      : item.featuretxt
                      ? this.trimByWord(item.featuretxt, 30)
                      : ""}
                  </span>
                </Link>

                {item.rate ? (
                  <Rate rate={item.rate} numOfVotes={item.rate_user_cnt} />
                ) : null}
                <br />
                <Link to={item.route ? item.route : ""} className="price">
                  {prices}
                </Link>
              </div>
            </div>
          </div>
        );
      case CARD_TYPES.wide:
        return (
          <div className="col-md-4 pad10">
            <div className="single-product big-product sale-product timed-product">
              <div className="image-container">
                <Link to={item.route ? item.route : ""}>
                  <span
                    className="image"
                    style={{
                      backgroundImage: `url(${IMAGE + item.img})`
                    }}
                  />
                </Link>
                {item.tags &&
                  item.tags.map((label, index) => (
                    <Label key={index} seq={index} data={label} />
                  ))}
                {hover}
              </div>
              <div className="info-container">
                <Link to={item.route ? item.route : ""} className="name">
                  <span>
                    {item.name
                      ? this.trimByWord(item.name)
                      : item.packagenm
                      ? this.trimByWord(item.packagenm)
                      : ""}
                  </span>
                </Link>
                <Link to={item.route ? item.route : ""} className="cat">
                  <span>
                    {item.shortnm
                      ? this.trimByWord(item.shortnm, 30)
                      : item.featuretxt
                      ? this.trimByWord(item.featuretxt, 30)
                      : ""}
                  </span>
                </Link>

                {item.rate ? (
                  <Rate rate={item.rate} numOfVotes={item.rate_user_cnt} />
                ) : null}
                <br />
                <Link to={item.route ? item.route : ""} className="price">
                  {prices}
                </Link>
              </div>
            </div>
          </div>
        );
      case CARD_TYPES.tile:
        return (
          <div
            className={`single-product big-product food-post food-${
              className ? className : "short"
            }`}
          >
            <div className="image-container">
              <Link to={item.route ? item.route : ""}>
                <span
                  className="image"
                  style={{
                    backgroundImage: `url(${IMAGE + item.img})`
                  }}
                />
              </Link>
              {item.tags &&
                item.tags.map((label, index) => (
                  <Label key={index} seq={index} data={label} />
                ))}
              {hover}
            </div>
            <div className="info-container">
              <Link to={item.route ? item.route : ""} className="name">
                <span>{this.trimByWord(item.recipenm)}</span>
              </Link>
              <Link to={item.route ? item.route : ""} className="cat">
                <span>{this.trimByWord(item.featuretxt, 30)}</span>
              </Link>
              <br />
              {/* <Rate rate={item.rate} numOfVotes={item.rate_user_cnt} /> */}
            </div>
          </div>
        );
      default:
        return null;
    }
  }
}

Card.propTypes = {
  type: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
  isLastInRow: PropTypes.bool,
  className: PropTypes.string
};

export default connect(
  null,
  { updateCart }
)(Card);
