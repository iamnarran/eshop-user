import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../../api";
import Rate from "../Rate";
import Label from "../Label";
import { Avatar } from "antd";
import withCart from "../HOC/withCart";
import { IMAGE, CARD_TYPES, LABEL_TYPES } from "../../utils/consts";
import productPlus from "../../scss/assets/images/demo/plusEmart.png";

import "./Card.css";

const formatter = new Intl.NumberFormat("en-US");

class Card extends React.Component {
  oneSave = item => {
    api.product
      .addWishList({ custId: this.props.user.id, skucd: item.cd })
      .then(res => {
        if (res.success) {
          this.props.onNotify("Амжилттай хадгаллаа.");
        }
      });
  };

  getPackageData = async id => {
    await api.packageInfo
      .findAllProducts({
        id: id
      })
      .then(res => {
        if (res.success) {
          res.data[0].products.map(item => {
            this.oneSave(item);
          });
        }
      });
  };

  getRecipeData = async recipeid => {
    await api.recipe
      .findAllProducts({
        id: recipeid
      })
      .then(res => {
        if (res.success) {
          res.data[0].products.map(item => {
            this.oneSave(item);
          });
        }
      });
  };

  handleSave = item => e => {
    e.preventDefault();

    if (this.props.isLoggedIn && this.props.user) {
      if (item.recipeid) {
        this.getRecipeData(item.recipeid);
      }
      if (item.id) {
        this.getPackageData(item.id);
      } else {
        this.oneSave(item);
      }
    } else {
      /* this.props.onNotify("ehleed newter"); */
    }
  };

  handleAddToCart = item => e => {
    e.preventDefault();

    let products = [];
    if (item.recipeid) {
      // Хоолны жор
      api.recipe.findAllProducts({ id: item.recipeid }).then(res => {
        if (res.success) {
          products = res.data[0].products;
          if (products.length) {
            products.reduce((acc, next) => {
              return acc.then(() => {
                return this.props.onAddToCart(next);
              });
            }, Promise.resolve());
          }
        } else {
          this.props.onNotify(res.message);
        }
      });
    } else if (item.id) {
      // Багц
      api.packageInfo.findAllProducts({ id: item.id }).then(res => {
        if (res.success) {
          products = res.data[0].products;
          if (products.length) {
            products.reduce((acc, next) => {
              return acc.then(() => {
                return this.props.onAddToCart(next);
              });
            }, Promise.resolve());
          }
        } else {
          this.props.onNotify(res.message);
        }
      });
    } else {
      // Бараа
      this.props.onIncrement(item);
      this.props.onUpdateCart(item);
    }
  };

  trimByWord(text, maxChars = 20) {
    if (!text) {
      return;
    }

    if (!text.length) {
      return text;
    }

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
    let prices;

    if (!item) {
      return null;
    }

    if (item.sprice || item.price) {
      let priceTitle = "";

      if (item.id) {
        priceTitle = <span style={{ fontWeight: "normal" }}>Багцын үнэ:</span>;
      } else if (item.recipeid) {
        priceTitle = <span style={{ fontWeight: "normal" }}>Орцын үнэ:</span>;
      }

      if (item.sprice) {
        prices = (
          <div className="row">
            {!!priceTitle && (
              <div className="col-md-6" style={{ textAlign: "left" }}>
                {priceTitle}
              </div>
            )}
            <div className={`col-md-${priceTitle ? "6" : "12"}`}>
              <small className="sale">
                {isNaN(item.price) ? 0 : formatter.format(item.price)}₮
              </small>
              <span className="current">
                {isNaN(item.sprice) ? 0 : formatter.format(item.sprice)}₮
              </span>
            </div>
          </div>
        );
      } else {
        prices = (
          <div className="row">
            {!!priceTitle && (
              <div className="col-md-6" style={{ textAlign: "left" }}>
                {priceTitle}
              </div>
            )}
            <div className={`col-md-${priceTitle ? "6" : "12"}`}>
              <span className="current">
                {isNaN(item.price) ? 0 : formatter.format(item.price)}₮
              </span>
            </div>
          </div>
        );
      }
    }

    let isDisabled = true;
    if (
      item.id ||
      item.recipeid ||
      item.availableqty > 0 ||
      item.isgift !== 0
    ) {
      isDisabled = false;
    }

    const hover = (
      <div className="search-hover">
        <Link to="" onClick={() => this.handleSave(item)}>
          <i className="fa fa-heart-o" aria-hidden="true" />
          <span />
        </Link>
        <Link
          to=""
          onClick={this.handleAddToCart(item)}
          style={{
            color: isDisabled ? "rgba(255, 155, 0, 0.5)" : "#ff9b00",
            fontSize: "1.6em",
            marginBottom: "8px",
            pointerEvents: isDisabled ? "none" : "auto"
          }}
        >
          <i className="fa fa-cart-plus" aria-hidden="true" />
        </Link>
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
                    <Label
                      key={index}
                      type={LABEL_TYPES.vertical}
                      data={label}
                      seq={index}
                    />
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
                {/* <br /> */}
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
                    <Label
                      key={index}
                      type={LABEL_TYPES.vertical}
                      data={label}
                      seq={index}
                    />
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
                  <Label
                    key={index}
                    type={LABEL_TYPES.vertical}
                    data={label}
                    seq={index}
                  />
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
              <Link to={item.route ? item.route : ""} className="price">
                {prices}
              </Link>
            </div>
          </div>
        );
      case CARD_TYPES.list:
        return (
          <div className="single-product list-product sale-product">
            <div className="image-container">
              <Link to={item.route ? item.route : ""}>
                <span
                  className="image"
                  style={{
                    backgroundImage: `url(${IMAGE + item.img})`
                  }}
                />
              </Link>
            </div>
            <div className="info-container">
              <Link to={item.route ? item.route : ""} className="name">
                <span>{this.trimByWord(item.name)}</span>
              </Link>
              <Link to={item.route ? item.route : ""} className="cat">
                <span>{this.trimByWord(item.featuretxt, 30)}</span>
              </Link>
              {item.rate ? (
                <Rate rate={item.rate} numOfVotes={item.rate_user_cnt} />
              ) : null}
              <Link
                to={item.route ? item.route : ""}
                className="price"
                style={{
                  padding: 0,
                  top: "auto",
                  bottom: "55px",
                  right: "20px",
                  left: "auto",
                  fontSize: "1rem"
                }}
              >
                {prices}
              </Link>
              {item.tags &&
                item.tags.map((label, index) => (
                  <Label
                    key={index}
                    type={LABEL_TYPES.horizontal}
                    data={label}
                    seq={index}
                  />
                ))}
              <div className="cart-container">
                <Link
                  to=""
                  className="wishlist"
                  onClick={e => this.handleSave(item)}
                >
                  <i className="fa fa-heart-o" aria-hidden="true" />
                </Link>
                <Link
                  to=""
                  onClick={this.handleAddToCart(item)}
                  style={{
                    fontSize: "1.1rem"
                  }}
                >
                  <i className="fa fa-cart-plus" aria-hidden="true" />
                  <span />
                </Link>
              </div>
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

export default withCart(Card);
