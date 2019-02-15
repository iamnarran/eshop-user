import React from "react";
import PropTypes from "prop-types";

import { CARD_LIST_TYPES, CARD_TYPES, CARD_NUMS_IN_COL } from "../utils/consts";
import Card from "./Card";

class CardList extends React.Component {
  state = {
    type: CARD_LIST_TYPES.horizontal,
    seq: null,
    cardsInCol: null,
    items: []
  };

  componentDidMount() {
    this.setState({ ...this.props });
  }

  getCardList = () => {
    if (!this.state.items.length) {
      return null;
    }

    let cardList = [];

    if (this.state.type === CARD_LIST_TYPES.horizontal) {
      const cardTypes = this.state.seq.split(",");
      for (let i = 0, p = 0; i < cardTypes.length; i++) {
        const cardType = parseInt(cardTypes[i]);
        const cardsInRow =
          cardType === CARD_TYPES.wide
            ? CARD_NUMS_IN_COL.wide
            : CARD_NUMS_IN_COL.slim;
        for (let j = 0; j < cardsInRow; j++, p++) {
          // console.log(this.state.items[p]);
          cardList.push(
            <Card
              key={p}
              type={cardType}
              item={this.state.items[p]}
              isLastInRow={j === cardsInRow - 1 ? true : false}
            />
          );
        }
      }

      return cardList;
    }

    const cardsInCol =
      Math.ceil(this.state.items.length / 3) < this.state.cardsInCol
        ? Math.ceil(this.state.items.length / 3)
        : this.state.cardsInCol;

    const cardsCount =
      this.state.items.length > cardsInCol * 3
        ? cardsInCol * 3
        : this.state.items.length;

    let cardsTemp = [];
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

      cardsTemp.push(
        <Card
          key={i}
          type={CARD_TYPES.tile}
          item={this.state.items[i]}
          className={className}
        />
      );

      if ((i + 1) % cardsInCol === 0 || i === cardsCount - 1) {
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
  items: PropTypes.array.isRequired
};

export default CardList;
