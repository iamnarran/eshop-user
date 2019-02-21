import React from "react";
import { Link } from "react-router-dom";

import { IMAGE, CARD_LIST_TYPES } from "../../utils/consts";
import CardList from "../../components/CardList";

class Season extends React.Component {
  render() {
    const {
      menu,
      primaryBanners,
      products,
      attributes,
      promoCats
    } = this.props.container;

    return (
      <div className="top-container">
        <div className="whole-page-title color-blue" style={{ padding: "0px" }}>
          <div
            className="whole-page-title color-blue class container pad10"
            style={{
              backgroundImage: `url(${
                primaryBanners !== undefined ? IMAGE + primaryBanners.imgnm : ""
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

        <div className="section">
          <div className="container pad10">
            <div className="e-breadcrumb">
              <ul className="list-unstyled">
                <li>
                  <Link to="">
                    <span>Нүүр хуудас</span>
                  </Link>
                </li>
                <li>
                  <span>Улирлын</span>
                </li>
              </ul>
            </div>
            <div className="row row10">
              <div className="col-xl-3 pad10">
                <div className="left-panel">
                  <h5 className="title">
                    <strong>Хайлтын үр дүн</strong>
                  </h5>
                  <p className="title">
                    <span>Ангилал</span>
                  </p>
                  <div className="block">
                    <div className="accordion" id="accordionExample">
                      <div className="collapse-content">
                        <ul className="list-unstyled">
                          {promoCats &&
                            promoCats.map(promo => (
                              <li>
                                <Link to="#">{promo.promotnm}</Link>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <h5 className="title">
                    <strong>Шүүлтүүр</strong>
                  </h5>
                  <div className="left-filter">
                    {attributes &&
                      attributes.map(attr => (
                        <div>
                          <a
                            className="collapse-title"
                            data-toggle="collapse"
                            href="#collapseThree"
                            role="button"
                            aria-expanded="true"
                            aria-controls="collapseExample"
                          >
                            {attr.attrnm}
                          </a>
                          <div className="collapse show" id="collapseThree">
                            <div className="collapse-content">
                              <ul className="list-unstyled">
                                {attr.values &&
                                  attr.values.map(val => (
                                    <li>
                                      <div className="custom-control custom-checkbox">
                                        <input
                                          type="checkbox"
                                          className="custom-control-input"
                                          id={val.id}
                                        />
                                        <label
                                          className="custom-control-label"
                                          for="customCheck1"
                                        >
                                          {val.text}
                                        </label>
                                      </div>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div className="col-xl-9 pad10">
                <CardList type={CARD_LIST_TYPES.horizontal} items={products} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Season;
