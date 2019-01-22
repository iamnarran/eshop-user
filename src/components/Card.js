import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import timesale5 from '../scss/assets/images/demo/8.jpg';

class Card extends React.Component {
  render() {
    const {product, cardType, type} = this.props;
    const saleTag = (        
      <div className="percent">
        <span className="text"><strong>{product.spercent}</strong><small>%</small></span>
      </div>
    )
    const timeTag = (
      <div className="time">
        <Icon type="clock-circle" />
        <span className="text">{product.time}</span>
      </div>
    )
    const saleFiveCard = (
        <div className="col-five pad10">
        <div className="single-product small-product sale-product">
          <div className="image-container">
            <Link to="">
                <span className="image" style={{ backgroundImage: `url(${timesale5})` }}></span>
            </Link>
            {saleTag}
            <div className="time">
                <Icon className="fa fa-clock-o" aria-hidden="true"/>
                <span className="text">{product.time}</span>
            </div>
          </div>
          <div className="info-container">
            <Link to="" className="name">
                <span>{product.skunm}</span>
            </Link>
            <Link to="" className="cat">
                <span>{product.shortnm}</span>
            </Link>
            <Link to="" className="rating">
              <ul className="list-inline">
                <li className="list-inline-item active">
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star-half-o" aria-hidden="true"></i>
                  <i className="fa fa-star-o" aria-hidden="true"></i>
                </li>
                <li className="list-inline-item active">
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star-half-o" aria-hidden="true"></i>
                  <i className="fa fa-star-o" aria-hidden="true"></i>
                </li>
                <li className="list-inline-item half-active">
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star-half-o" aria-hidden="true"></i>
                  <i className="fa fa-star-o" aria-hidden="true"></i>
                </li>
                <li className="list-inline-item">
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star-half-o" aria-hidden="true"></i>
                  <i className="fa fa-star-o" aria-hidden="true"></i>
                </li>
                <li className="list-inline-item">
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star-half-o" aria-hidden="true"></i>
                  <i className="fa fa-star-o" aria-hidden="true"></i>
                </li>
                <li className="list-inline-item">
                  <span className="text">{product.rate}</span>
                </li>
              </ul>
            </Link>
            <Link to="" className="price">
              <small className="sale">{product.price+'₮'}</small>
              <span className="current">{product.sprice+'₮'}</span>
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
                    {saleTag}
                    {timeTag}
                </div>
                <div className="info-container">
                    <Link to="" className="name">
                        <span>{product.skunm}</span>
                    </Link>
                    <Link to="" className="cat">
                        <span>{product.shortnm}</span>
                    </Link>
                    <Link to="" className="rating">
                        <ul className="list-inline">
                            <li className="list-inline-item active">
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                <i className="fa fa-star-o" aria-hidden="true"></i>
                            </li>
                            <li className="list-inline-item active">
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                <i className="fa fa-star-o" aria-hidden="true"></i>
                            </li>
                            <li className="list-inline-item half-active">
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                <i className="fa fa-star-o" aria-hidden="true"></i>
                            </li>
                            <li className="list-inline-item">
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                <i className="fa fa-star-o" aria-hidden="true"></i>
                            </li>
                            <li className="list-inline-item">
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                <i className="fa fa-star-o" aria-hidden="true"></i>
                            </li>
                            <li className="list-inline-item">
                                <span className="text">{product.rate}</span>
                            </li>
                        </ul>
                    </Link>
                    <Link to="" className="price">
                        <small className="sale">{product.price+'₮'}</small>
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
    else  return <b>CardType type error</b>
  }
}


Card.default = {
  product: [],
}

Card.PropTypes = {
  product: PropTypes.object,
  cardType: PropTypes.string,
  type: PropTypes.string,
}

export default Card;