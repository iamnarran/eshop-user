import React from "react";

import CardList from "../../components/CardList";
import Banner from "../../components/Banner";
import PageHeader from "../../components/PageHeader";
import { CARD_LIST_TYPES } from "../../utils/consts";

class Recipe extends React.Component {
  render() {
    const {
      products,
      primaryBanners,
      secondaryBanners,
      menu
    } = this.props.container;

    const cardsInCol = 2;

    return (
      <div className="top-container">
        <PageHeader
          title={menu.menunm}
          subtitle={menu.subtitle}
          banners={primaryBanners}
          bgColor="#fffdb7"
        />

        <div className="section">
          <div className="container pad10">
            <CardList
              type={CARD_LIST_TYPES.vertical}
              cardsInCol={2}
              items={products.slice(0, cardsInCol * 3)}
            />
          </div>
        </div>

        <Banner data={secondaryBanners} />

        <div className="section">
          <div className="container pad10">
            <CardList
              type={CARD_LIST_TYPES.vertical}
              items={products.slice(cardsInCol * 3)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Recipe;
