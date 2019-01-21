import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Badge, Avatar } from 'antd';

import timesale5 from '../scss/assets/images/demo/5.jpg';
import Rate from './Rate';

const cardTypes = {
  'wide': 1,
  'thin': 2,
};
Object.freeze(cardTypes);

const numOfCards = {
  'wide': 3,
  'thin': 5,
}
Object.freeze(numOfCards);

class Widget extends React.Component {
  renderCard(product, renderType = cardTypes.wide) {
    if (parseInt(renderType) !== cardTypes.wide) {
      return (
        <div className="col-five pad10">
            <div className="single-product small-product">
                <div className="image-container">
                    <Link to="">
                        <span className="image" style={{ backgroundImage: `url(${timesale5})` }}></span>
                    </Link>
                    <div className="percent">
                        <span className="text"><strong>10</strong><small>%</small></span>
                    </div>
                    <div className="time">
                        <i className="fa fa-clock-o" aria-hidden="true"></i>
                        <span className="text">21 : 32 : 46</span>
                    </div>
                </div>
                <div className="info-container">
                    <Link to="" className="name">
                        <span>Хуурай кофе Американо No Brand</span>
                    </Link>
                    <Link to="" className="cat">
                        <span>Лаазтай кофе латте Лаазтай кофе латте</span>
                    </Link>
                    
                    <Rate />

                    <Link to="" className="price">
                        <small className="sale">6,900₮</small>
                        <span className="current">6,500₮</span>
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
                      <span className="image" style={{ backgroundImage: `url(${timesale5})` }}></span>
                  </Link>
                  <div className="percent">
                      <span className="text"><strong>10</strong><small>%</small></span>
                  </div>
                  <div className="time">
                      <i className="fa fa-clock-o" aria-hidden="true"></i>
                      <span className="text">21 : 32 : 46</span>
                  </div>
              </div>
              <div className="info-container">
                  <Link to="" className="name">
                      <span>{product ? product.skunm : null}</span>
                  </Link>
                  <Link to="" className="cat">
                      <span>Лаазтай кофе латте</span>
                  </Link>

                  <Rate />
                  
                  <Link to="" className="price">
                      <small className="sale">{product ? product.sprice : null}₮</small>
                      <span className="current">6,500₮</span>
                  </Link>
              </div>
          </div>
      </div>
    );
  }

  renderProducts(products, renderOrder) {
    const rows = renderOrder.split(',');
    let cards = [];
    for (let i = 0, p = 0; i < rows.length; i++) {
      const cardsInRow = parseInt(rows[i]) === cardTypes.wide ? numOfCards.wide : numOfCards.thin;
      for (let j = 0; j < cardsInRow; j++) {
        cards.push(this.renderCard(products[p++], rows[i]));
      }
    }

    return cards;
  }

  render() {
    let subtitle = null;
    if (this.props.subtitle) {
      subtitle = (
        <p className="text">
            <Icon type="clock-circle" />
            <span>{ this.props.subtitle }</span>
        </p>
      );
    }

    return (
      <div className="section">
          <div className="container pad10">
              <h1 className="title">
                  <span className="text-uppercase">{this.props.title}</span>
                  {subtitle}
              </h1>
              <div className="row row10">
                  {this.renderProducts(this.props.products, this.props.renderOrder)}
              </div>
              <div className="more-link text-center">
                  <Link to="" className="btn btn-border">
                      <span className="text text-uppercase">Эрэлт ихтэй бусад барааг үзэх</span>
                  </Link>
              </div>
          </div>
      </div>
    );
  }
}

export default Widget;
