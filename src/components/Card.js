import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

// import config from '../config';
import Rate from './Rate';
import Label from './Label';
import { CARD_TYPES } from '../utils/consts';
import img5 from '../scss/assets/images/demo/5.jpg';
import img13 from '../scss/assets/images/demo/13.jpg';

import './Card.css';

class Card extends React.Component {
  render() {
    const { item, extra } = this.props;

    if (!item) {
      return null;
    }

    let { renderType, labelColor } = this.props;
    renderType = parseInt(renderType);

    let percentLabel = null;
    let expiryDateLabel = null;
    let productCountLabel = null;

    let prices = <span className="current">{item.price}₮</span>;
    
    // if (extra && extra.includes('expiryDate')) {
    //   expiryDateLabel = (
    //     <div className="time">
    //       <Icon type="clock-circle" />
    //       <span className="text">{item.edate}</span>
    //     </div>
    //   );
    // }

    if (extra && extra.includes('percent')) {
      percentLabel = (
        <Label bgColor={labelColor} item={item} />
      );
    }

    if (extra && extra.includes('productCount')) {
      productCountLabel = (
        <Label bgColor={labelColor} item={item} />
      );
    }

    if (extra && extra.includes('discountPrice') && item.sprice) {
      const formatter = new Intl.NumberFormat('en-US');

      prices = (
        <div>
          <small className="sale">{formatter.format(item.price)}₮</small>
          <span className="current">{formatter.format(item.sprice)}₮</span>
        </div>
      );
    }

    switch (renderType) {
      case CARD_TYPES.slim:
        return (
          <div className="col-five pad10">
              <div className="single-product small-product sale-product timed-product">
                  <div className="image-container">
                      <Link to="#">
                        <span className="image" style={{ backgroundImage: `url(${img5})` }}></span>
                      </Link>
                      {percentLabel}
                      {productCountLabel}
                      {expiryDateLabel}
                  </div>
                  <div className="info-container">
                      <Link to="#" className="name">
                          <span>{item.name ? item.name : item.packagenm}</span>
                      </Link>
                      <Link to="#" className="cat">
                          <span>{item.shortnm ? item.shortnm : item.featuretxt}</span>
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
                        <span className="image" style={{ backgroundImage: `url(${img5})` }}></span>
                      </Link>
                      {percentLabel}
                      {productCountLabel}
                      {expiryDateLabel}
                  </div>
                  <div className="info-container">
                      <Link to="#" className="name">
                          <span>{item.name ? item.name : item.packagenm}</span>
                      </Link>
                      <Link to="#" className="cat">
                          <span>{item.shortnm ? item.shortnm : item.featuretxt}</span>
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
                  <span className="image" style={{ backgroundImage: `url(${img13})` }}></span>
                </Link>
                {percentLabel}
                {productCountLabel}
                {expiryDateLabel}
            </div>
            <div className="info-container">
              <Link to="#" className="name">
                <span>{item.recipenm}</span>
              </Link>
              <Link to="#" className="cat">
                <span>{item.featuretxt}</span>
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
