import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import moment from 'moment';

import Card from './Card';
import { CARD_TYPES, CARD_NUMS_IN_COL, WIDGET_TYPES, WIDGET_LABELS, WIDGET_SLUGS } from '../utils/consts';

import './Widget.css';

class Widget extends React.Component {
  renderItems() {
    const { widget, type, items, label } = this.props;

    let cards = [];
    if (type === WIDGET_TYPES.horizontal) {
        const cardTypes = widget.type.split(',');
        for (let i = 0, p = 0; i < cardTypes.length; i++) {
            const cardsInRow = parseInt(cardTypes[i]) === CARD_TYPES.wide ? CARD_NUMS_IN_COL.wide : CARD_NUMS_IN_COL.slim;
            for (let j = 0; j < cardsInRow; j++) {
                cards.push(
                    <Card 
                        key={p}
                        renderType={cardTypes[i]} 
                        item={items[p++]} 
                        label={label}
                        none={j === cardsInRow - 1 ? true : false}
                        extra={WIDGET_LABELS[widget.slug]} 
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
                label={label}
                extra={WIDGET_LABELS[widget.slug]} 
            />
        );

        if ((i + 1) % cardNumsInCol === 0 || i === iterationNum - 1) {
            cardsToRender.push(<div className="col-md-4 pad10" key={i}>{cards}</div>);
            cards = [];
        }
    }

    return cardsToRender;
  }

  render() {
    const { widget } = this.props;

    let subtitle = null;
    if (widget.subtitle) {
      subtitle = (
        <p className="text">
            <Icon type="clock-circle" /> { widget.subtitle }
        </p>
      );
    }

    let dateInterval = null;
    let buttonValue = 'Цааш үзэх';
    switch (widget.slug) {
        case WIDGET_SLUGS.onlyEmart:
            buttonValue = 'Зөвхөн Имартын бусад барааг үзэх';
            break;
        case WIDGET_SLUGS.discount:
            dateInterval = (
                <span>
                    {moment().startOf('month').format('MM/DD')} ~ {moment().endOf('month').format('MM/DD')}
                </span>
            );
            buttonValue = 'Бусад хямдралтай барааг үзэх';
            break;
        case WIDGET_SLUGS.package:
            buttonValue = 'Бусад багцыг үзэх';
            break;
        case WIDGET_SLUGS.recipe:
            buttonValue = 'Бусад хоолны жорыг үзэх';
            break;
        default:
    }

    return (
      <div className="section">
          <div className="container pad10">
              <h1 className="title">
                  <span className="text-uppercase">{widget.name}</span>
                  {subtitle}
                  {dateInterval}
              </h1>
              <div className="row row10">
                  {this.renderItems()}
              </div>
              <div className="more-link text-center">
                  <Link to={widget.link ? widget.link : ''} className="btn btn-border">
                      <span className="text text-uppercase">{buttonValue}</span>
                  </Link>
              </div>
          </div>
      </div>
    );
  }
}

export default Widget;
