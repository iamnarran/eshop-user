import React from "react";
import PropTypes from "prop-types";

import { CARD_LIST_TYPES, CARD_TYPES, CARD_NUMS_IN_ROW } from "../utils/consts";
import Card from "./Card";

class CardList extends React.Component {
  state = {
    type: CARD_LIST_TYPES.horizontal,
    seq: null,
    cardsInCol: null,
    items: [],
    showAll: false,
    cardType: CARD_TYPES.slim
  };

  componentDidMount() {
    this.setState({ ...this.props });
  }

  getCardsAccordingToSeq = (cardTypes, items) => {
    const cards = [];
    if (this.props.second) {
      for (let p = 0; p <= items.length;) {
        for (let i = 0; i < cardTypes.length; i++) {
          const cardType = parseInt(cardTypes[i]);
          const cardsInRow =
            cardType === CARD_TYPES.wide
              ? CARD_NUMS_IN_ROW.wide
              : CARD_NUMS_IN_ROW.slim;
          for (let j = 0; j < cardsInRow; j++ , p++) {
            if (items[p]) {
              cards.push(
                <Card
                  key={p}
                  type={cardType}
                  item={items[p]}
                  isLastInRow={j === cardsInRow - 1 ? true : false}
                />
              );
            }
          }
        }
      }
    }
    else {
      for (let i = 0; i < cardTypes.length; i++) {
        const cardType = parseInt(cardTypes[i]);
        const cardsInRow =
          cardType === CARD_TYPES.wide
            ? CARD_NUMS_IN_ROW.wide
            : CARD_NUMS_IN_ROW.slim;
        for (let j = 0, p = 0; j < cardsInRow; j++ , p++) {
          if (items[p]) {
            cards.push(
              <Card
                key={p}
                type={cardType}
                item={items[p]}
                isLastInRow={j === cardsInRow - 1 ? true : false}
              />
            );
          }
        }
      }
    }


    return cards;
  };

  getCardList = () => {
    const { type, seq, cardsInCol, items, showAll, cardType } = this.state;

    if (!items.length) {
      return null;
    }

    let cardList = [];
    if (type === CARD_LIST_TYPES.horizontal) {
      if (seq) {
        const cardTypes = seq.split(",");

        if (showAll) {
          let cardsLength = 0;
          cardTypes.forEach(cardType => {
            cardsLength +=
              parseInt(cardType) === CARD_TYPES.slim
                ? CARD_NUMS_IN_ROW.slim
                : CARD_NUMS_IN_ROW.wide;
          });
          for (let i = 0; i < Math.ceil(items.length % cardsLength); i++) {
            const lastIndex = i * cardsLength + cardsLength - 1;
            cardList = [
              ...cardList,
              ...this.getCardsAccordingToSeq(
                cardTypes,
                items.slice(
                  i * cardsLength,
                  lastIndex < items.length ? lastIndex : items.length
                )
              )
            ];
          }
        } else {
          cardList = [...this.getCardsAccordingToSeq(cardTypes, items)];
        }
      } else {
        const cardsInRow =
          cardType === CARD_TYPES.slim
            ? CARD_NUMS_IN_ROW.slim
            : CARD_NUMS_IN_ROW.wide;

        items.forEach((item, index) => {
          cardList.push(
            <Card
              key={item.cd}
              type={cardType}
              item={item}
              isLastInRow={(index + 1) % cardsInRow === 0 ? true : false}
            />
          );
        });
      }

      return cardList;
    }

    let cardsInColCalculated = Math.ceil(items.length / 3);

    if (cardsInCol) {
      cardsInColCalculated =
        cardsInColCalculated < cardsInCol ? cardsInColCalculated : cardsInCol;
    }

    const cardsCount =
      items.length > cardsInColCalculated * 3
        ? cardsInColCalculated * 3
        : items.length;
    let cardsTemp = [];
    for (let i = 0; i < cardsCount; i++) {
      let className = "short";
      if (
        (cardsInColCalculated % 2 !== 0 && i % 2 === 0) ||
        (cardsInColCalculated % 2 === 0 &&
          ((Math.floor(i / cardsInColCalculated) % 2 === 0 && i % 2 === 0) ||
            (Math.floor(i / cardsInColCalculated) % 2 !== 0 && i % 2 !== 0)))
      ) {
        className = "long";
      }
      cardsTemp.push(
        <Card
          key={i}
          type={CARD_TYPES.tile}
          item={items[i]}
          className={className}
        />
      );
      if ((i + 1) % cardsInColCalculated === 0 || i === cardsCount - 1) {
        cardList.push(
          <div key={i} className="col-md-4 pad10">
            {cardsTemp}
          </div>
        );
        cardsTemp = [];
      }
    }
    return cardList;
  };

  render() {
    return <div className="row row10">{this.getCardList()}</div>;
  }
}

CardList.propTypes = {
  type: PropTypes.number.isRequired,
  seq: PropTypes.string,
  cardsInCol: PropTypes.number,
  items: PropTypes.array.isRequired,
  showAll: PropTypes.bool,
  cardType: PropTypes.number
};

export default CardList;
