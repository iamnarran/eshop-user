import React from "react";

import CardList from "../components/CardList";
import Banner from "../components/Banner";
import PageHeader from "../components/PageHeader";
import {
  CARD_TYPES,
  CARD_LIST_TYPES,
  CARD_NUMS_IN_ROW
} from "../utils/consts";

class Discount extends React.Component {
  render() {
    const {
      products,
      primaryBanners,
      secondaryBanners,
      menu
    } = this.props.container;

    const seq = "1,1";
    const cardTypes = seq.split(",");

    let cardsLength = 0;
    cardTypes.forEach(cardType => {
      cardsLength +=
        parseInt(cardType) === CARD_TYPES.slim
          ? CARD_NUMS_IN_ROW.slim
          : CARD_NUMS_IN_ROW.wide;
    });

    return (
      <div className="top-container">
        <PageHeader
          title={menu.menunm}
          subtitle={menu.subtitle}
          banners={primaryBanners}
          bgColor="#4286f4"
        />

        <div className="section">
          <div className="container pad10">
            <CardList
              type={CARD_LIST_TYPES.horizontal}
              seq={seq}
              items={products.slice(0, cardsLength)}
            />
          </div>
        </div>

        <Banner data={secondaryBanners} />

        <div className="section">
          <div className="container pad10">
            <CardList
              type={CARD_LIST_TYPES.horizontal}
              items={products.slice(cardsLength)}
              showAll
              cardType={CARD_TYPES.slim}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Discount;
