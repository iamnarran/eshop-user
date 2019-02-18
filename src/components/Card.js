import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Rate from "./Rate";
import Label from "./Label";
import { IMAGE, CARD_TYPES } from "../utils/consts";

import "./Card.css";

class Card extends React.Component {
  state = {
    type: CARD_TYPES.slim,
    item: null,
    isLastInRow: false,
    className: ""
  };

  componentDidMount() {
    this.setState({ ...this.props });
  }

  render() {
    /* console.log("card", this.props) */
    if (!this.state.item) {
      return null;
    }

    const formatter = new Intl.NumberFormat("en-US");
    let prices = (
      <span className="current">
        {formatter.format(this.state.item.price)}₮
      </span>
    );

    if (this.state.item.sprice) {
      prices = (
        <div>
          <small className="sale">{this.state.item.price}₮</small>
          <span className="current">{this.state.item.sprice}₮</span>
        </div>
      );
    }

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

    switch (this.state.type) {
      case CARD_TYPES.slim:
        return (
          <div
            className={`col-five pad10${
              this.props.none ? " d-none d-xl-block lol" : " col-md-3 col-6"
              }`}
          >
            <div className="single-product small-product sale-product timed-product">
              <div className="image-container">
                <Link to={`/productdetail/${item.cd}`} params={item}>
                  <span className="image" style={{ backgroundImage: `url(${IMAGE + item.img})` }}></span>
                </Link>
                {this.state.item.tags &&
                  this.state.item.tags.map((label, index) => (
                    <Label key={index} seq={index} data={label} />
                  ))}
                {hover}
              </div>
              <div className="info-container">
                <Link to="#" className="name">
                  <span>
                    {this.state.item.name
                      ? this.trimByWord(this.state.item.name)
                      : this.state.item.packagenm
                        ? this.trimByWord(this.state.item.packagenm)
                        : ""}
                  </span>
                </Link>
                <Link to="#" className="cat">
                  <span>
                    {this.state.item.shortnm
                      ? this.trimByWord(this.state.item.shortnm, 30)
                      : this.state.item.featuretxt
                        ? this.trimByWord(this.state.item.featuretxt, 30)
                        : ""}
                  </span>
                </Link>

                {this.state.item.rate ? (
                  <Rate
                    rate={this.state.item.rate}
                    numOfVotes={this.state.item.rate_user_cnt}
                  />
                ) : null}
                <br />
                <Link to="#" className="price">
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
                <Link to="/">
                  <span className="image" style={{ backgroundImage: `url(${IMAGE + item.img})` }}></span>
                </Link>
                {this.state.item.tags &&
                  this.state.item.tags.map((label, index) => (
                    <Label key={index} seq={index} data={label} />
                  ))}
                {hover}
              </div>
              <div className="info-container">
                <Link to="#" className="name">
                  <span>
                    {this.state.item.name
                      ? this.trimByWord(this.state.item.name)
                      : this.state.item.packagenm
                        ? this.trimByWord(this.state.item.packagenm)
                        : ""}
                  </span>
                </Link>
                <Link to="#" className="cat">
                  <span>
                    {this.state.item.shortnm
                      ? this.trimByWord(this.state.item.shortnm, 30)
                      : this.state.item.featuretxt
                        ? this.trimByWord(this.state.item.featuretxt, 30)
                        : ""}
                  </span>
                </Link>

                {this.state.item.rate ? (
                  <Rate
                    rate={this.state.item.rate}
                    numOfVotes={this.state.item.rate_user_cnt}
                  />
                ) : null}
                <br />
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
              this.state.className ? this.state.className : "short"
              }`}
          >
            <div className="image-container">
              <Link to="/">
                <span className="image" style={{ backgroundImage: `url(${IMAGE + item.img})` }}></span>
              </Link>
              {this.state.item.tags &&
                this.state.item.tags.map((label, index) => (
                  <Label key={index} seq={index} data={label} />
                ))}
              {hover}
            </div>
            <div className="info-container">
              <Link to="#" className="name">
                <span>{this.trimByWord(this.state.item.recipenm)}</span>
              </Link>
              <Link to="#" className="cat">
                <span>{this.trimByWord(this.state.item.featuretxt, 30)}</span>
              </Link>
              <br />
              {/* <Rate rate={this.state.item.rate} numOfVotes={item.rate_user_cnt} /> */}
            </div>
          </div>
        );
      default:
        return null;
    }
  }

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
}

Card.propTypes = {
  type: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
  isLastInRow: PropTypes.bool,
  className: PropTypes.string
};

export default Card;
