import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import timesale5 from '../scss/assets/images/demo/8.jpg';
import Rate from './Rate';

class CardPage extends React.Component {
  render() {
    var nf = new Intl.NumberFormat();
    const {product, cardType, type, neew, time, sale} = this.props;

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
      <div class="percent new">
        <span class="text"><strong>Шинэ</strong></span>
      </div>
    )
    const hover = (
      <div className="search-hover">
        <Link to="">
          <i className="fa fa-heart-o" aria-hidden="true"></i>                
          <span></span>
        </Link>
        <Link to="">
          <i className="fa fa-cart-plus" aria-hidden="true"></i>                
          <span></span>
        </Link>
      </div>
    )
    const saleFiveCard = (
        <div className="col-five col-md-3 col-6 pad10">
        <div className="single-product small-product sale-product new-product">
          <div className="image-container">
            <Link to="">
                <span className="image" style={{ backgroundImage: `url(${timesale5})` }}></span>
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
    const saleThreeCard = (
      <div className="col-xl-4 pad10">
            <div className="single-product big-product sale-product timed-product">
                <div className="image-container">
                    <Link to="">
                        <span className="image" style={{ backgroundImage: `url(${timesale5})` }}></span>
                    </Link>
                    {time ? timeTag : ''}
                    {sale ? saleTag : ''}
                    {neew ? newTag : ''}
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
                        <small className="sale">{product.price+'₮'}</small>
                        <span className="current">{product.price+'₮'}</span>
                    </Link>
                </div>
            </div>
            </div>
    )
    const newFiveCard = (
      <div className="col-five col-md-3 col-6 pad10">
        <div className="single-product small-product sale-product new-product">
          <div className="image-container">
            <Link to="">
                <span className="image" style={{ backgroundImage: `url(${timesale5})` }}></span>
            </Link>
            {time ? timeTag : ''}
            {sale ? saleTag : ''}
            {neew ? newTag : ''}
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
    
    if(cardType.toString() === "1" && type.toString() === "sale"){
      return ( saleFiveCard )
    }
    else if(cardType.toString() === "2" && type.toString() === "sale"){
      return ( saleThreeCard )
    }
    else if(cardType.toString() === "1" && type.toString() === "new"){
      return ( newFiveCard )
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