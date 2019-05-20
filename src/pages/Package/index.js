import React from "react";

import CardList from "../../components/CardList";
import { IMAGE, CARD_LIST_TYPES } from "../../utils/consts";
import Banner from "../../components/Banner";

class Package extends React.Component {
  state = {
    ...this.props.container
  };

  changeLocation = () => {
    if (this.state.mainbanner !== undefined) {
      window.open(
        this.state.mainbanner.link ? this.state.mainbanner.link : " ",
        "_blank"
      );
    }
  };

  render() {
    return (
      <div className="top-container">
        <div
          className="whole-page-title"
          style={{ padding: "0px", backgroundColor: "#ff99cc" }}
        >
          <div
            className="whole-page-title container pad10"
            style={{
              backgroundImage: `url(${
                this.state.mainbanner !== undefined
                  ? IMAGE + this.state.mainbanner.imgnm
                  : ""
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
                    {this.state.menu[0] === undefined
                      ? ""
                      : this.state.menu[0].menunm}
                  </span>
                  <strong>
                    {this.state.menu[0] === undefined
                      ? ""
                      : this.state.menu[0].subtitle}
                  </strong>
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="section package">
          <div className="container pad10">
            {
              <CardList
                type={CARD_LIST_TYPES.horizontal}
                seq={this.state.widget[0].type}
                items={this.state.packageProducts.slice(0, 8)}
              />
            }
          </div>
        </div>
        <Banner data={this.state.secondaryBanners} />
        <div className="section">
          <div className="container pad10">
            {
              <CardList
                type={CARD_LIST_TYPES.horizontal}
                seq={this.state.widget[0].type}
                items={this.state.packageProducts.slice(8)}
                second={true}
              />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Package;
