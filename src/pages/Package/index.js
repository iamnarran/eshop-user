import React from 'react';
import Card from "../../components/Card";
import { IMAGE } from "../../utils/consts";

class Package extends React.Component {
  state = {
    ...this.props.container
  }
  render() {
    console.log(this.state);

    return (
      <div className="top-container">
        <div className="whole-page-title color-blue" style={{ padding: '0px' }}>
          <div
            className="whole-page-title container color-blue pad10"
            style={{
              backgroundImage: `url(${
                this.state.mainbanner !== undefined ? IMAGE + this.state.mainbanner.img : ""
                })`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right",
              backgroundSize: "50% 115px",
            }}
            onClick={this.changeLocation}
          >
            <div className="container pad10">
              <div className="title-container flex-space">
                <h2>
                  <span className="big">
                    {this.state.menu[0] === undefined ? "" : this.state.menu[0].menunm}
                  </span>
                  <strong>{this.state.menu[0] === undefined ? "" : this.state.menu[0].subtitle}</strong>
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="section">
          <div className="container pad10">
            <div className="row row10">
              {this.state.packageProducts.map((product, key) => {
                return (
                  <Card
                    key={key}
                    type={1}
                    item={product}
                  // extra={["new"]}
                  // label={tag}
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

export default Package;