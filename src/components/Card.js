import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

import Rate from './Rate';
import { CARD_TYPES } from '../utils/consts';

import img5 from '../scss/assets/images/demo/5.jpg';
import img6 from '../scss/assets/images/demo/6.jpg';
import img7 from '../scss/assets/images/demo/7.jpg';
import img8 from '../scss/assets/images/demo/8.jpg';
import img9 from '../scss/assets/images/demo/9.jpg';
import img11 from '../scss/assets/images/demo/11.jpg';
import img12 from '../scss/assets/images/demo/12.jpg';
import img13 from '../scss/assets/images/demo/13.jpg';
import img14 from '../scss/assets/images/demo/14.jpg';
import img15 from '../scss/assets/images/demo/15.jpg';
import img16 from '../scss/assets/images/demo/16.jpg';
import img17 from '../scss/assets/images/demo/17.jpg';

// const images = [5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17];

class Card extends React.Component {
  render() {
    const { product, extra } = this.props;

    if (!product) {
      return null;
    }

    let { renderType } = this.props;
    renderType = parseInt(renderType);

    let percentLabel = null;
    let expiryDateLabel = null;
    let productCountLabel = null;

    let prices = <span className="current">{product.price}₮</span>;
    
    if (extra && extra.includes('expiryDate')) {
      expiryDateLabel = (
        <div className="time">
          <Icon type="clock-circle" />
          <span className="text">{product.edate}</span>
        </div>
      );
    }

    if (extra && extra.includes('percent')) {
      percentLabel = (
        <div className="percent">
          <span className="text"><strong>{product.spercent}</strong><small>%</small></span>
        </div>
      );
    }

    if (extra && extra.includes('productCount')) {
      productCountLabel = (
        <div className="percent">
          <span className="text"><strong>12</strong><small>ш</small></span>
        </div>
      );
    }

    if (extra && extra.includes('discountPrice') && product.sprice) {
      prices = (
        <div>
          <small className="sale">{product.price}₮</small>
          <span className="current">{product.sprice}₮</span>
        </div>
      );
    }

    if (renderType === CARD_TYPES.slim) {
      return (
        <div className="col-five pad10">
            <div className="single-product small-product">
                <div className="image-container">
                    <Link to="">
                        <span className="image" style={{ backgroundImage: `url(${img5})` }}></span>
                    </Link>
                    {percentLabel}
                    {productCountLabel}
                    {expiryDateLabel}
                </div>
                <div className="info-container">
                    <Link to="" className="name">
                        <span>{product.name}</span>
                    </Link>
                    <Link to="" className="cat">
                        <span>{product.shortnm}</span>
                    </Link>
                    
                    <Rate rate={product.rate} numOfVotes={product.rate_user_cnt} />

                    <Link to="" className="price">
                        {prices}
                    </Link>
                </div>
            </div>
        </div>
      );
    }

    return (
      <div className="col-xl-4 pad10">
          <div className="single-product big-product sale-product timed-product">
              <div className="image-container">
                  <Link to="">
                      <span className="image" style={{ backgroundImage: `url(${img5})` }}></span>
                  </Link>
                  {percentLabel}
                  {productCountLabel}
                  {expiryDateLabel}
              </div>
              <div className="info-container">
                  <Link to="" className="name">
                      <span>{product.name}</span>
                  </Link>
                  <Link to="" className="cat">
                      <span>{product.shortnm}</span>
                  </Link>

                  <Rate rate={product.rate} numOfVotes={product.rate_user_cnt} />
                  
                  <Link to="" className="price">
                      {prices}
                  </Link>
              </div>
          </div>
      </div>
    );
  }
}

export default Card;
