import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

import Rate from './Rate';

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

const images = [5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17];

const WIDGET_TYPES = {
  'onlyEmart': 'Зөвхөн И-МАРТ дэлгүүрт',
  'discount': 'Цагийн хямдрал',
  'batch': 'Багцын бараа',
  'recipe': 'Хоолны жор',
};
Object.freeze(WIDGET_TYPES);

const CARD_TYPES = {
  'wide': 1,
  'thin': 2,
};
Object.freeze(CARD_TYPES);

class Card extends React.Component {
  render() {
    const {product, widgetType} = this.props;

    if (!product) {
      return null;
    }

    let {renderType} = this.props;
    renderType = parseInt(renderType);

    let mainLabel = null;
    let expiryDateLabel = null;

    let prices = <span className="current">{product.price}₮</span>;
    
    if (product.edate && widgetType === WIDGET_TYPES.discount) {
      expiryDateLabel = (
        <div className="time">
          <Icon type="clock-circle" />
          <span className="text">{product.edate}</span>
        </div>
      );
    }

    if (product.spercent && (widgetType === WIDGET_TYPES.new || widgetType === WIDGET_TYPES.discount || widgetType === WIDGET_TYPES.batch)) {
      mainLabel = (
        <div className="percent">
          <span className="text"><strong>{product.spercent}</strong><small>%</small></span>
        </div>
      );
      prices = (
        <div>
          <small className="sale">{product.price}₮</small>
          <span className="current">{product.sprice}₮</span>
        </div>
      );
    }

    if (renderType !== CARD_TYPES.wide) {
      return (
        <div className="col-five pad10">
            <div className="single-product small-product">
                <div className="image-container">
                    <Link to="">
                        <span className="image" style={{ backgroundImage: `url(${img5})` }}></span>
                    </Link>
                    {mainLabel}
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
                  {mainLabel}
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
