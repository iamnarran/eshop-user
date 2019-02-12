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
    const { type, item } = this.props;

    if (!item) {
      return null;
    }

    // const { labels } = item;

    // if (labels && labels.includes("percent")) {
    //   labels.percent = <Label data={labels.percent} item={item} />;
    // }

    // if (labels && labels.includes("count")) {
    //   labels.count = <Label data={labels.count} item={item} />;
    // }

    // if (labels && labels.includes("new")) {
    //   labels.new = <Label data={labels.new} item={item} />;
    // }

    const formatter = new Intl.NumberFormat("en-US");
    let prices = (
      <span className="current">{formatter.format(item.price)}₮</span>
    );

    // if (labels && labels.includes("percent")) {
    //   prices = (
    //     <div>
    //       <small className="sale">{formatter.format(item.price)}₮</small>
    //       <span className="current">
    //         {item.sprice
    //           ? formatter.format(item.sprice)
    //           : formatter.format(item.price)}
    //         ₮
    //       </span>
    //     </div>
    //   );
    // }

    const hover = (
      <div className="search-hover">
        <Link to="#">
          <i className="fa fa-heart-o" aria-hidden="true" />
          <span />
        </Link>
        <Link to="#">
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
              this.props.none ? " d-none d-xl-block lol" : ""
            }`}
          >
            <div className="single-product small-product sale-product timed-product">
              <div className="image-container">
                <Link to="#">
                  <span
                    className="image"
                    style={{ backgroundImage: `url(${IMAGE + item.img})` }}
                  />
                </Link>
                {/* {labels.map(label => label)} */}
                {hover}
              </div>
              <div className="info-container">
                <Link to="#" className="name">
                  <span>
                    {item.name
                      ? this.trimByWord(item.name)
                      : item.packagenm
                      ? this.trimByWord(item.packagenm)
                      : ""}
                  </span>
                </Link>
                <Link to="#" className="cat">
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

                <Link to="#" className="price">
                  {prices}
                </Link>
              </div>
            </div>
          </div>
        );
      case CARD_TYPES.wide:
        return (
          <div className="col-xl-4 pad10">
            <div className="single-product big-product sale-product timed-product">
              <div className="image-container">
                <Link to="#">
                  <span
                    className="image"
                    style={{ backgroundImage: `url(${IMAGE + item.img})` }}
                  />
                </Link>
                {/* {labels.map(label => label)} */}
                {hover}
              </div>
              <div className="info-container">
                <Link to="#" className="name">
                  <span>
                    {item.name
                      ? this.trimByWord(item.name)
                      : item.packagenm
                      ? this.trimByWord(item.packagenm)
                      : ""}
                  </span>
                </Link>
                <Link to="#" className="cat">
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

                <Link to="#" className="price">
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
              item.class ? item.class : "short"
            }`}
          >
            <div className="image-container">
              <Link to="#">
                <span
                  className="image"
                  style={{ backgroundImage: `url(${IMAGE + item.img})` }}
                />
              </Link>
              {/* {labels.map(label => label)} */}
              {hover}
            </div>
            <div className="info-container">
              <Link to="#" className="name">
                <span>{this.trimByWord(item.recipenm)}</span>
              </Link>
              <Link to="#" className="cat">
                <span>{this.trimByWord(item.featuretxt, 30)}</span>
              </Link>

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
  item: PropTypes.object.isRequired
};

export default Card;
