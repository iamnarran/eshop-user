import React from 'react';
import CardList from "../../components/CardList";
import { IMAGE, CARD_LIST_TYPES } from "../../utils/consts";
import Banner from '../../components/Banner';
class Package extends React.Component {
  state = {
    ...this.props.container
  }
  render() {
    console.log("haha", this.state.mainbanner)
    return (
      <div className="top-container">
        <div className="whole-page-title" style={{ padding: '0px', backgroundColor: '#ff99cc' }}>
          <div className="container whole-page-title" style={{ height: '115px', padding: '0px' }}>
            <div className="title-container flex-space col-sm-12 col-md-6 col-ls-6" style={{ float: 'left', padding: '25px 0px' }}>
              <h2>
                <span className="big">
                  {this.state.menu[0] === undefined ? "" : this.state.menu[0].menunm}
                </span>
                <strong>{this.state.menu[0] === undefined ? "" : this.state.menu[0].subtitle}</strong>
              </h2>
            </div>
            <a href={this.state.mainbanner.link ? this.state.mainbanner.link : ' '} target="_blank">
              <div className="whole-page-title container col-md-6 col-ls-6"
                style={{
                  backgroundImage: `url(${
                    this.state.mainbanner !== undefined ? IMAGE + this.state.mainbanner.imgnm : ""
                    })`,
                  float: 'right',
                  height: '100%'
                }}>
              </div>
            </a>
          </div>
        </div>

        <div className="section">
          <div className="container pad10">
            <div className="row row10">
              {
                <CardList
                  type={CARD_LIST_TYPES.horizontal}
                  seq={this.state.widget[0].type}
                  items={this.state.packageProducts.slice(0, 8)}
                />
              }
            </div>
          </div>
        </div>
        <Banner data={this.state.secondaryBanners} />
        <div className="section">
          <div className="container pad10">
            <div className="row row10">
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
      </div>
    );
  }
}

export default Package;
