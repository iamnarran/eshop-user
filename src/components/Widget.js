import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

import Card from './Card';
import { CARD_TYPES, CARD_NUMS_IN_COL, WIDGET_LABELS } from '../utils/consts';

class Widget extends React.Component {
  renderProducts(widgetType, products, renderOrder) {
    const rows = renderOrder.split(',');
    let cards = [];
    for (let i = 0, p = 0; i < rows.length; i++) {
      const cardsInRow = parseInt(rows[i]) === CARD_TYPES.wide ? CARD_NUMS_IN_COL.wide : CARD_NUMS_IN_COL.slim;
      for (let j = 0; j < cardsInRow; j++) {
        cards.push(<Card product={products[p++]} renderType={rows[i]} extra={WIDGET_LABELS[widgetType]} />);
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
                  <span className="text-uppercase">{this.props.name}</span>
                  {subtitle}
              </h1>
              <div className="row row10">
                  {this.renderProducts(this.props.name, this.props.products, this.props.renderOrder)}
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
