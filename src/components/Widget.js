import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import moment from 'moment';

import Card from './Card';
import { CARD_TYPES, CARD_NUMS_IN_COL, WIDGET_TYPES, WIDGET_LABELS, WIDGET_SLUGS } from '../utils/consts';

import './Widget.css';

class Widget extends React.Component {
    state = { none: false }
    renderItems() {
        let cards = [];
        if (this.props.type === WIDGET_TYPES.horizontal) {
            const cardTypes = this.props.widget.type.split(',');
            for (let i = 0, p = 0; i < cardTypes.length; i++) {
                const cardsInRow = parseInt(cardTypes[i]) === CARD_TYPES.wide ? CARD_NUMS_IN_COL.wide : CARD_NUMS_IN_COL.slim;
                for (let j = 0; j < cardsInRow; j++) {
                    if (j === 4) {
                        cards.push(
                            <Card
                                key={p}
                                renderType={cardTypes[i]}
                                item={this.props.items[p++]}
                                labelColor={this.props.labelColor}
                                extra={WIDGET_LABELS[this.props.widget.slug]}
                                none={!this.state.none}
                            />
                        );
                    }
                    else {
                        cards.push(
                            <Card
                                key={p}
                                renderType={cardTypes[i]}
                                item={this.props.items[p++]}
                                labelColor={this.props.labelColor}
                                extra={WIDGET_LABELS[this.props.widget.slug]}
                                none={this.state.none}
                            />
                        );
                    }

                }
            }

            return cards;
        }

        let cardNumsInCol = 2;
        cardNumsInCol = Math.ceil(this.props.items.length / 3) < cardNumsInCol ? Math.ceil(this.props.items.length / 3) : cardNumsInCol;

        const iterationNum = this.props.items.length > cardNumsInCol * 3 ? cardNumsInCol * 3 : this.props.items.length;

        let cardsToRender = [];
        for (let i = 0; i < iterationNum; i++) {
            cards.push(
                <Card
                    key={i}
                    index={i}
                    cardNumsInCol={cardNumsInCol}
                    renderType={CARD_TYPES.tile}
                    item={this.props.items[i]}
                    labelColor={this.props.labelColor}
                    extra={WIDGET_LABELS[this.props.widget.slug]}
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
        let subtitle = null;
        if (this.props.widget.subtitle) {
            subtitle = (
                <p className="text">
                    <Icon type="clock-circle" /> {this.props.widget.subtitle}
                </p>
            );
        }

        let dateInterval = null;
        let buttonValue = 'Цааш үзэх';
        switch (this.props.widget.slug) {
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
                        <span className="text-uppercase">{this.props.widget.name}</span>
                        {subtitle}
                        {dateInterval}
                    </h1>
                    <div className="row row10">
                        {this.renderItems()}
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
