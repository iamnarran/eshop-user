import React from "react";
import Card from "../../components/Card";
import Banner from "../../components/Banner";

import { IMAGE } from "../../utils/consts";

class Newproduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.container
    };
  }

  changeLocation = () => {
    if (this.state.mainbanner !== undefined) {
      window.open(this.state.mainbanner.link, "_blank");
    }
  };

  render() {
    const {
      newproduct,
      mainbanner,
      subbanner,
      menu
      /* tag */
    } = this.state;
    let products = [];
    // console.log(this.props);

    return (
      <div className="top-container">
        {/**NEW PRODUCT TITLE */}
        <div className="whole-page-title color-blue" style={{ padding: "0px" }}>
          <div
            className="whole-page-title color-blue class container pad10"
            style={{
              backgroundImage: `url(${
                mainbanner !== undefined ? IMAGE + mainbanner.imgnm : ""
              })`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right",
              backgroundSize: "50% 115px"
            }}
            onClick={this.changeLocation}
          >
            <div className="container pad10">
              <div className="title-container flex-space">
                <h2>
                  <span className="big">
                    {menu[0] === undefined ? "" : menu[0].menunm}
                  </span>
                  <strong>
                    {menu[0] === undefined ? "" : menu[0].subtitle}
                  </strong>
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/**NEW PRODUCT'S PRODUCTS */}
        {
          (newproduct === null) ? '' : (
            (newproduct.length === 0) ? '' : (
              <div className="section">
                <div className="container pad10">
                  <div className="row row10">
                    {newproduct.map((product, key) => {
                      if (key >= 10) {
                        products.push(product);
                        return null;
                      } else {
                        return (
                          <Card
                            key={key}
                            type={1}
                            item={product}
                            // extra={["new"]}
                            // label={tag}
                          />
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
            )
          ) 
        }

        {/**SUB BANNER */}
        {/* <div className="banner-container">
          <span
            style={{
              backgroundImage: `url(${
                subbanner !== undefined ? IMAGE + subbanner.img : ""
                })`
            }}
          />
          <div className="container pad10">
            <a
              href={subbanner !== undefined ? subbanner.link : ""}
              target="_blank"
              rel="noopener"
            >
              {subbanner !== undefined ? subbannerhtml : null}
            </a>
          </div>
        </div> */}
        <Banner data={subbanner} />

        {/**NEW PRODUCT'S PRODUCTS */}
        <div className="section">
          <div className="container pad10">
            <div className="row row10">
              {products.map((product, key) => {
                return (
                  <Card
                    key={key}
                    type={1}
                    item={product}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Newproduct.default = {
  newproduct: []
};

export default Newproduct;
