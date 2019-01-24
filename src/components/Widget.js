import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

import Card from './Card';
import { CARD_TYPES, CARD_NUMS_IN_COL, WIDGET_TYPES, WIDGET_LABELS, WIDGET_NAMES } from '../utils/consts';

class Widget extends React.Component {
  renderItems(type, name, renderOrder, items) {
    let cards = [];

    if (type === WIDGET_TYPES.horizontal) {
        const rows = renderOrder.split(',');
        for (let i = 0, p = 0; i < rows.length; i++) {
            const cardsInRow = parseInt(rows[i]) === CARD_TYPES.wide ? CARD_NUMS_IN_COL.wide : CARD_NUMS_IN_COL.slim;
            for (let j = 0; j < cardsInRow; j++) {
                cards.push(
                    <Card 
                        key={p}
                        renderType={rows[i]} 
                        item={items[p++]} 
                        extra={WIDGET_LABELS[name]} 
                    />
                );
            }
        }

        return cards;
    }

    let cardNumsInCol = 2;
    cardNumsInCol = Math.ceil(items.length / 3) < cardNumsInCol ? Math.ceil(items.length / 3) : cardNumsInCol;

    const iterationNum = items.length > cardNumsInCol * 3 ? cardNumsInCol * 3 : items.length;

    let cardsToRender = [];
    for (let i = 0; i < iterationNum; i++) {
        cards.push(
            <Card 
                key={i}
                index={i}
                cardNumsInCol={cardNumsInCol}
                renderType={CARD_TYPES.tile} 
                item={items[i]} 
                extra={WIDGET_LABELS[name]} 
            />
        );

        if ((i + 1) % cardNumsInCol === 0 || i === iterationNum - 1) {
            cardsToRender.push(<div class="col-md-4 pad10">{cards}</div>);
            cards = [];
        }
    }

    return cardsToRender;
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

    let buttonValue = 'Цааш үзэх';
    switch (this.props.name) {
        case WIDGET_NAMES.onlyEmart:
            buttonValue = 'Зөвхөн Имартын бусад барааг үзэх';
            break;
        case WIDGET_NAMES.discount:
            buttonValue = 'Бусад хямдралтай барааг үзэх';
            break;
        case WIDGET_NAMES.package:
            buttonValue = 'Бусад багцыг үзэх';
            break;
        case WIDGET_NAMES.recipe:
            buttonValue = 'Бусад хоолны жорыг үзэх';
            break;
        default:
    }

    return (
      <div className="section">
          <div className="container pad10">
              <h1 className="title">
                  <span className="text-uppercase">{this.props.name}</span>
                  {subtitle}
              </h1>
              <div className="row row10">
                  {this.renderItems(this.props.type, this.props.name, this.props.renderOrder, this.props.items)}
              </div>
              <div className="more-link text-center">
                  <Link to="" className="btn btn-border">
                      <span className="text text-uppercase">{buttonValue}</span>
                  </Link>
              </div>
          </div>
      </div>
    );
  }
}

export default Widget;
