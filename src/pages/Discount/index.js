import React from "react";

import CardList from "../../components/CardList";
import Banner from "../../components/Banner";
import PageHeader from "../../components/PageHeader";
import {CARD_TYPES, CARD_LIST_TYPES } from "../../utils/consts";

class Discount extends React.Component {
  // state = {
  //   products: [],
  //   primaryBanners: [],
  //   secondaryBanners: [],
  //   menu: null
  // };

  constructor(props) {
    super(props);
    this.state = { ...this.props.container };
  }

  componentDidMount() {
    this.setState({ ...this.props.container });
  }

  render() {
    const { products, primaryBanners, secondaryBanners, menu } = this.state;

    return (
      <div className="top-container">
        {/**DISCOUNT PRODUCT TITLE*/}
        <PageHeader
          title={menu.menunm}
          subtitle={menu.subtitle}
          banners={primaryBanners}
          bgColor="#4286f4"
        />
        {/* <div className="whole-page-title color-main" style={{ padding: "0px" }}>
          <div
            className="whole-page-title color-main class container pad10"
            style={{
              backgroundImage: `url(${
                primaryBanners !== undefined ? IMAGE + primaryBanners.imgnm : ""
              })`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right",
              backgroundSize: "50% 115px"
            }}
          >
            <div className="container pad10">
              <div className="title-container flex-space">
                <h2>
                  <span className="big">
                    {menu === undefined ? "" : menu.menunm}
                  </span>
                  <strong>{menu === undefined ? "" : menu.subtitle}</strong>
                </h2>
              </div>
            </div>
          </div>
        </div> */}

        <div className="section">
          <div className="container pad10">
            <CardList
              type={CARD_LIST_TYPES.horizontal}
              seq="1,1"
              items={products}
            />
          </div>
        </div>

        <Banner data={secondaryBanners} />

        <div className="section">
          <div className="container pad10">
            <CardList
              type={CARD_LIST_TYPES.horizontal}
              items={products}
              showAll
              cardType={CARD_TYPES.slim}
            />
          </div>
        </div>
      </div>
    );
  }
}

Discount.default = {
  saleproduct: []
};

export default Discount;
