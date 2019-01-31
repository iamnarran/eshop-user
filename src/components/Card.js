import React from 'react';
import { Link } from 'react-router-dom';

import config from '../config';
import Rate from './Rate';
import Label from './Label';
import { CARD_TYPES } from '../utils/consts';

import './Card.css';

const IMAGE =
  process.env.NODE_ENV === 'development'
    ? config.image.development
    : config.image.production;

class Card extends React.Component {
  trimByWord(text, maxChars = 20) {
    const textWords = text.split(' ');
    const textWordsCount = textWords.length;

    if (textWordsCount <= maxChars) {
      return text;
    }

    let trimmed = text.substr(0, maxChars);
    trimmed = trimmed.substr(0, Math.min(trimmed.length, trimmed.lastIndexOf(' ')));

    return `${trimmed}...`;
  }

  render() {
    const { item, label, extra } = this.props;
    // console.log(this.props);
    
    if (!item) {
      return null;
    }

    let { renderType } = this.props;
    renderType = parseInt(renderType);

    let expiryDateLabel = null;
    let percentLabel = null;
    let productCountLabel = null;
    let newLabel = null;

    const formatter = new Intl.NumberFormat('en-US');
    let prices = <span className="current">{formatter.format(item.price)}₮</span>;

    if (extra && extra.includes('percent')) {
      percentLabel = (
        <Label label={label} item={item} />
      );
    }

    if (extra && extra.includes('productCount')) {
      productCountLabel = (
        <Label label={label} item={item} />
      );
    }

    if (extra && extra.includes('new')) {
      newLabel = (
        <Label label={label} item={item} isNew />
      );
    }

    if (extra && extra.includes('discountPrice') && item.sprice) {
      prices = (
        <div>
          <small className="sale">{formatter.format(item.price)}₮</small>
          <span className="current">{formatter.format(item.sprice)}₮</span>
        </div>
      );
    }

    const hover = (
      <div className="search-hover">
        <Link to="#" >
          <i className="fa fa-heart-o" aria-hidden="true"></i>                
          <span></span>
        </Link>
        <Link to="#">
          <i className="fa fa-cart-plus" aria-hidden="true"></i>                
          <span></span>
        </Link>
      </div>
    )

    switch (renderType) {
      case CARD_TYPES.slim:
        return (
          <div className={`col-five pad10${this.props.none ? ' d-none d-xl-block lol' : ''}`}>
            <div className="single-product small-product sale-product timed-product">
                <div className="image-container">
                    <Link to="#">
                      <span className="image" style={{ backgroundImage: `url(${IMAGE + item.img})` }}></span>
                    </Link>
                    {percentLabel}
                    {productCountLabel}
                    {newLabel}
                    {expiryDateLabel}
                    {hover}
                </div>
                <div className="info-container">
                    <Link to="#" className="name">
                        <span>{item.name ? this.trimByWord(item.name) : item.packagenm ? this.trimByWord(item.packagenm) : ''}</span>
                    </Link>
                    <Link to="#" className="cat">
                        <span>{item.shortnm ? this.trimByWord(item.shortnm, 30) : item.featuretxt ? this.trimByWord(item.featuretxt, 30) : ''}</span>
                    </Link>
                    
                    {item.rate ? <Rate rate={item.rate} numOfVotes={item.rate_user_cnt} /> : null}

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
                      <span className="image" style={{ backgroundImage: `url(${IMAGE + item.img})` }}></span>
                    </Link>
                    {percentLabel}
                    {productCountLabel}
                    {expiryDateLabel}
                    {hover}
                </div>
                <div className="info-container">
                    <Link to="#" className="name">
                        <span>{item.name ? this.trimByWord(item.name) : item.packagenm ? this.trimByWord(item.packagenm) : ''}</span>
                    </Link>
                    <Link to="#" className="cat">
                        <span>{item.shortnm ? this.trimByWord(item.shortnm, 30) : item.featuretxt ? this.trimByWord(item.featuretxt, 30) : ''}</span>
                    </Link>
  
                    {item.rate ? <Rate rate={item.rate} numOfVotes={item.rate_user_cnt} /> : null}
                    
                    <Link to="#" className="price">
                      {prices}
                    </Link>
                </div>
            </div>
          </div>
        );
      case CARD_TYPES.tile:
        let c = 'short';
        if ((this.props.cardNumsInCol % 2 !== 0 && this.props.index % 2 === 0)
          || (this.props.cardNumsInCol % 2 === 0 && ((Math.floor(this.props.index / this.props.cardNumsInCol) % 2 === 0 && this.props.index % 2 === 0) || (Math.floor(this.props.index / this.props.cardNumsInCol) % 2 !== 0 && this.props.index % 2 !== 0)))) {
          c = 'long';
        }

        return (
          <div className={`single-product big-product food-post food-${c}`}>
            <div className="image-container">
              <Link to="#">
                <span className="image" style={{ backgroundImage: `url(${IMAGE + item.img})` }}></span>
              </Link>
              {percentLabel}
              {productCountLabel}
              {expiryDateLabel}
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

export default Card;
