import React from "react";
import { Link } from "react-router-dom";

import { CARD_LIST_TYPES, CARD_TYPES } from "../utils/consts";
import CardList from "../components/CardList";
import { Spin } from "antd";
import PageHeader from "../components/PageHeader";
import api from "../api";

class Season extends React.Component {
  state = {
    products: [],
    loading: false,
    promoCats: [],
    filtered: false
  };
  componentWillMount() {
    this.setState({
      products: this.props.container.products,
      promoCats: this.props.container.promoCats
    });
  }

  handleSortClick = (e, item) => {
    if (this.state.filtered === false) {
      let tmp = [];
      item.link = false;
      tmp.push(item);
      this.setState({
        loading: true,
        promoCats: tmp,
        filtered: !this.state.filtered
      });
      api.product.seasonProductFilter({ id: item.promotid }).then(response => {
        this.checkResponse(response);
      });
    }
  };

  handleRemoveFilter = () => {
    this.setState({ filtered: !this.state.filtered, loading: true });
    api.product.findAllSeasonProducts({ jumcd: "99" }).then(response => {
      this.checkResponse(response);
      this.setState({ promoCats: this.props.container.promoCats });
    });
  };

  checkResponse = response => {
    if (response.success) {
      this.setState({ products: response.data, loading: false });
    } else {
      this.setState({ loading: false });
    }
  };

  render() {
    const { menu, primaryBanners, attributes } = this.props.container;
    const { products, promoCats } = this.state;
    return (
      <div className="top-container">
        <PageHeader
          title={menu.menunm}
          subtitle={menu.subtitle}
          banners={primaryBanners}
          bgColor="#b8f497"
        />

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
                  <div className="block">
                    <div className="accordion" id="accordionExample">
                      <div className="collapse-content">
                        <ul className="list-unstyled">
                          {promoCats &&
                            promoCats.map((promo, index) => (
                              <li key={index}>
                                <a
                                  onClick={e => this.handleSortClick(e, promo)}
                                >
                                  {promo.promotnm}
                                </a>
                              </li>
                            ))}
                          {this.state.filtered == true ? (
                            <li>
                              <a onClick={this.handleRemoveFilter}>
                                <span className="filter-remove-btn">Буцах</span>
                              </a>
                            </li>
                          ) : (
                            ""
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <h5 className="title">
                    <strong>Шүүлтүүр</strong>
                  </h5>
                  <div className="left-filter">
                    {attributes &&
                      attributes.map((attr, index) => (
                        <div key={index}>
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
                                  attr.values.map((val, index) => (
                                    <li key={index}>
                                      <div className="custom-control custom-checkbox">
                                        <input
                                          type="checkbox"
                                          className="custom-control-input"
                                          id={val.id}
                                        />
                                        <label
                                          className="custom-control-label"
                                          htmlFor="customCheck1"
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
                <Spin spinning={this.state.loading}>
                  <CardList
                    type={CARD_LIST_TYPES.horizontal}
                    items={products}
                    showAll
                    cardType={CARD_TYPES.wide}
                  />
                </Spin>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Season;
