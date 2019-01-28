import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import Rate from './Rate';
import config from 'config';

const IMAGE =
process.env.NODE_ENV === 'development'
    ? config.image.development
    : config.image.production;
class CardPage extends React.Component {
  render() {
    let nf = new Intl.NumberFormat();
    const {product, type, neew, time, sale} = this.props;

    /**CARD'S TAG **/
    const saleTag = (
      <div className="percent">
        <span className="text"><strong>{product.spercent}</strong><small>%</small></span>
      </div>
    )
    const timeTag = (
      <div className="time">
        <Icon type="clock-circle" />
        <span className="text">{'10 : 25 : 02'}</span>
      </div>
    )
    const newTag = (
      <div className="percent new">
        <span className="text"><strong>Шинэ</strong></span>
      </div>
    )
    const hover = (
      <div className="search-hover">
        <Link to="" >
          <i className="fa fa-heart-o" aria-hidden="true"></i>                
          <span></span>
        </Link>
        <Link to="">
          <i className="fa fa-cart-plus" aria-hidden="true"></i>                
          <span></span>
        </Link>
      </div>
    )

    /**PAGE'S CARD */
    const DiscountCard = (
        <div className="col-five col-md-3 col-6 pad10">
        <div className="single-product small-product sale-product new-product">
          <div className="image-container">
            <Link to="">
                <span className="image" style={{ backgroundImage: `url(${IMAGE+product.img})` }}></span>
            </Link>
            {time ? timeTag : ''}
            {sale ? saleTag : ''}
            {neew ? newTag : ''}
            {hover}
          </div>
          <div className="info-container">
            <Link to="" className="name">
                <span>{product.name +' '+ product.brandnm}</span>
            </Link>
            <Link to="" className="cat">
                <span>{product.shortnm}</span>
            </Link>
            <Rate rate={product.rate} numOfVotes={product.rate_user_cnt} />
            <Link to="" className="price">
              <small className="sale">{nf.format(product.price)+'₮'}</small>
              <span className="current">{nf.format(product.sprice)+'₮'}</span>
            </Link>
          </div>
        </div>
        </div>
    )
    const Newcard = (
      <div className="col-five col-md-3 col-6 pad10">
        <div className="single-product small-product sale-product new-product">
          <div className="image-container">
            <Link to="">
                <span className="image" style={{ backgroundImage: `url(${IMAGE+product.img})` }}></span>
            </Link>
            {time ? timeTag : ''}
            {sale ? saleTag : ''}
            {neew ? newTag : ''}
            {hover}
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
              <span className="current">{product.price+'₮'}</span>
            </Link>
          </div>
        </div>        
      </div>
    )
    
    if(type === "discount"){
      return ( DiscountCard )
    }
    else if(type === "new"){
      return ( Newcard )
    }
    else  return <b>CardType type error</b>
  }
}

CardPage.default = {
  product: [],
  neew: false,
  sale: false,
  time: false,
  banner: false,
  type: null,
  cardType: null,
  key: null,
}

CardPage.PropTypes = {
  product: PropTypes.object,
  cardType: PropTypes.string,
  type: PropTypes.string,
  neew: PropTypes.bool,
  sale: PropTypes.bool,
  time: PropTypes.bool,
  banner: PropTypes.bool,
  key: PropTypes.number,
}

export default CardPage;