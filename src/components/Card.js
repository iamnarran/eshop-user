import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Rate from "./Rate";
import Label from "./Label";
import { IMAGE, CARD_TYPES } from "../utils/consts";

import "./Card.css";

class Card extends React.Component {

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
        <Link to="">
          <i className="fa fa-cart-plus" aria-hidden="true" />
          <span />
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
                <Link
                  to={item.route ? item.route : ""}
                >
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
                <Link to="" className="name">
                  <span>
                    {item.name
                      ? this.trimByWord(item.name)
                      : item.packagenm
                      ? this.trimByWord(item.packagenm)
                      : ""}
                  </span>
                </Link>
                <Link to="" className="cat">
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
                <Link to="" className="price">
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
                <Link to="" className="name">
                  <span>
                    {item.name
                      ? this.trimByWord(item.name)
                      : item.packagenm
                      ? this.trimByWord(item.packagenm)
                      : ""}
                  </span>
                </Link>
                <Link to="" className="cat">
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
                <Link to="" className="price">
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
              <Link to="" className="name">
                <span>{this.trimByWord(item.recipenm)}</span>
              </Link>
              <Link to="" className="cat">
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

export default Card;
