import React from "react";
import PropTypes from "prop-types";

import { CARD_LIST_TYPES, CARD_TYPES, CARD_NUMS_IN_COL } from "../utils/consts";
import Card from "./Card";

class CardList extends React.Component {
  render() {
    const { type, seq, items } = this.props;
    let { cardsInCol } = this.props;

    let cardList = [];

    if (type === CARD_LIST_TYPES.horizontal) {
      const cardTypes = seq.split(",");
      for (let i = 0, p = 0; i < cardTypes.length; i++) {
        const cardType = parseInt(cardTypes[i]);
        const cardsInRow =
          cardType === CARD_TYPES.wide
            ? CARD_NUMS_IN_COL.wide
            : CARD_NUMS_IN_COL.slim;
        for (let j = 0; j < cardsInRow; j++) {
          cardList.push(
            <Card
              key={p}
              type={cardType}
              item={items[p++]}
              //   none={j === cardsInRow - 1 ? true : false}
              //   extra={WIDGET_LABELS[widget.slug]}
            />
          );
        }
      }

      return cardList;
    }

    cardsInCol =
      Math.ceil(items.length / 3) < cardsInCol
        ? Math.ceil(items.length / 3)
        : cardsInCol;

    const cardsCount =
      items.length > cardsInCol * 3 ? cardsInCol * 3 : items.length;

    let cards = [];
    for (let i = 0; i < cardsCount; i++) {
      let className = "short";
      if (
        (cardsInCol % 2 !== 0 && i % 2 === 0) ||
        (cardsInCol % 2 === 0 &&
          ((Math.floor(i / cardsInCol) % 2 === 0 && i % 2 === 0) ||
            (Math.floor(i / cardsInCol) % 2 !== 0 && i % 2 !== 0)))
      ) {
        className = "long";
      }

      items[i]["class"] = className;

      cards.push(
        <Card
          key={i}
          //   index={i}
          //   cardsInCol={cardsInCol}
          type={CARD_TYPES.tile}
          item={items[i]}
          //   label={label}
          //   extra={WIDGET_LABELS[widget.slug]}
        />
      );

      if ((i + 1) % cardsInCol === 0 || i === cardsCount - 1) {
        cardList.push(
          <div key={i} className="col-md-4 pad10">
            {cards}
          </div>
        );
        cards = [];
      }
    }

    return cardList;
  }
}

CardList.propTypes = {
  type: PropTypes.number.isRequired,
  seq: PropTypes.string,
  cardsInCol: PropTypes.number,
  items: PropTypes.array.isRequired
};

export default CardList;
