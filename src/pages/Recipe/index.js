import React from "react";

import { IMAGE, CARD_LIST_TYPES } from "../../utils/consts";
import CardList from "../../components/CardList";
import Banner from "../../components/Banner";

class Recipe extends React.Component {
  render() {
    const {
      products,
      primaryBanner,
      secondaryBanners,
      tag
    } = this.props.container;

    return (
      <div className="top-container">
        <div
          className="whole-page-title color-blue pad10"
          style={{
            backgroundImage: `url(${
              primaryBanner && primaryBanner.img
                ? IMAGE + primaryBanner.img
                : ""
            })`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right",
            backgroundSize: "50% 115px",
            marginBottom: "20px"
          }}
          onClick={this.changeLocation}
        >
          <div className="container">
            <h1>Хоолны жор</h1>
            <h3>Хоолны жор, Хоолны жор, Хоолны жор</h3>
          </div>
        </div>

        <div className="section">
          <div className="container pad10">
            <CardList
              type={CARD_LIST_TYPES.vertical}
              cardsInCol={2}
              items={products}
            />
          </div>
        </div>

        <Banner data={secondaryBanners} />

        {/* <div className="banner-container">
          <span
            style={{ backgroundImage: `url(${IMAGE + secondaryBanner.img})` }}
          />
          <div className="container pad10">
            <Link to={secondaryBanner.link}>
              <img
                alt="banner"
                src={IMAGE + secondaryBanner.img}
                className="img-fluid"
              />
            </Link>
          </div>
        </div> */}
      </div>
    );
  }
}

export default Recipe;
