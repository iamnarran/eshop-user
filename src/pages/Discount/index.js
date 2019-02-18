import React from "react";
import Card from "../../components/Card";
import Banner from "../../components/Banner";

import config from "config";

const IMAGE =
  process.env.NODE_ENV === "development"
    ? config.image.development
    : config.image.production;
class Discount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saleproduct: [],
      mainbanner: [],
      subbanner: [],
      menu: [],
      tag: [],
    };
  }

  componentDidMount() {
    this.setState({ ...this.props.container })
  }

  changeLocation = () => {
    if (this.state.mainbanner !== undefined) {
      window.open(this.state.mainbanner.link, "_blank");
    }
  };

  render() {
    const { saleproduct, mainbanner, subbanner, menu, tag } = this.state;    
    let subbannerhtml = (<img alt="banner" src={subbanner!==undefined ? IMAGE+subbanner.img:''} className="img-fluid"/>)
    let products = []

    return (
      <div className="top-container">
        {/**DISCOUNT PRODUCT TITLE*/}
        <div className="whole-page-title color-main" style={{ padding: "0px" }}>
          <div
            className="whole-page-title color-main class container pad10"
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
        {/**SUB BANNER PRODUCT */}
        <div className="section">
          <div className="container pad10">
            <div className="row row10">
              {saleproduct.map((product, key) => {
                if (key >= 10) {
                  products.push(product);
                  return null;
                } else {
                  return (
                    <Card
                      key={key}
                      item={product}
                      extra={["percent", "expiryDate", "discountPrice"]}
                      renderType="1"
                      label={tag}
                    />
                  );
                }
              })}
            </div>
          </div>
        </div>

        {/**DISCOUNT SUB BANNER */}
        {/* <div className="banner-container">
          <span style={{ backgroundImage: `url(${subbanner !== undefined ? IMAGE + subbanner.img : ''})` }}></span>
          <div className="container pad10">
            <a href={subbanner !== undefined ? subbanner.link : ''} target="_blank" rel="noopener">
              {subbanner !== undefined ? subbannerhtml : ''}
            </a>
          </div>
        </div> */}
        {
          console.log(subbanner)
          
        }
        <Banner data={subbanner} />

        {/**FOOTER PRODUCT */}
        <div className="section">
          <div className="container pad10">
            <div className="row row10">
              {products.map((product, key) => {
                return (
                  <Card
                    key={key}
                    item={product}
                    extra={["percent", "expiryDate", "discountPrice"]}
                    renderType="1"
                    label={tag}
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

Discount.default = {
  saleproduct: []
};

export default Discount;
