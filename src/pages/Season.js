import React from "react";
import { Link } from "react-router-dom";
import { Spin, Select } from "antd";
import { toast } from "react-toastify";

import api from "../api";
import { CARD_LIST_TYPES, CARD_TYPES } from "../utils/consts";
import CardList from "../components/CardList";
import FilterSet from "../components/FilterSet";

class Season extends React.Component {
  constructor(props) {
    super(props);

    let min,
      max = 0;

    const attributes = props.container.attributes;
    attributes &&
      attributes.map(attr => {
        if (attr.type === "PRICE") {
          min = parseInt(
            attr.attributes[0].values.find(val => val.valuecd === "MIN")
              .valuename
          );
          max = parseInt(
            attr.attributes[0].values.find(val => val.valuecd === "MAX")
              .valuename
          );
        }
      });

    this.state = {
      loading: false,
      isListViewOn: false,
      minPrice: min,
      maxPrice: max,
      sort: "price_asc",
      checkedList: [],
      products: this.props.container.products
    };
  }

  notify = message => toast(message, { autoClose: 5000 });

  fetchProductData = ({ promoId, checkedList, minPrice, maxPrice, sort }) => {
    this.setState({ loading: true });

    const data = {
      promotid: promoId,
      parameters: checkedList,
      minprice: minPrice,
      maxprice: maxPrice,
      ordercol: sort
    };

    console.log("data", data);

    api.season.findAllFilteredInfo(data).then(res => {
      console.log("res", res);
      if (res.success) {
        this.setState({
          products: res.data[0].products
        });
      } else {
        this.notify(res.message);
      }
      this.setState({ loading: false });
    });
  };

  handlePriceAfterChange = value => {
    const { checkedList, sort } = this.state;

    const params = {
      catId: this.props.container.id,
      checkedList,
      minPrice: value[0],
      maxPrice: value[1],
      sort
    };

    this.fetchProductData(params);

    this.setState({
      minPrice: value[0],
      maxPrice: value[1]
    });
  };

  handleAttributeChange = e => {
    const { minPrice, maxPrice, sort } = this.state;

    let checkedList = this.state.checkedList;
    const i = checkedList.indexOf(e.target.value);

    if (e.target.checked) {
      checkedList.push(e.target.value);
    } else if (i !== -1) {
      checkedList.splice(i, 1);
    }

    console.log("checkedList", checkedList);

    this.setState({ checkedList });

    const params = {
      promoId: this.props.container.id,
      checkedList,
      minPrice,
      maxPrice,
      sort
    };

    this.fetchProductData(params);
  };

  handleSortChange = value => {
    const { checkedList, minPrice, maxPrice } = this.state;

    const params = {
      catId: this.props.container.id,
      checkedList,
      minPrice,
      maxPrice,
      sort: value
    };

    this.fetchProductData(params);

    this.setState({
      sort: value
    });
  };

  handleListViewClick = e => {
    e.preventDefault();
    this.setState({ isListViewOn: true });
  };

  handleGridViewClick = e => {
    e.preventDefault();
    this.setState({ isListViewOn: false });
  };

  render() {
    const { id, promoCats, attributes } = this.props.container;
    const products = this.state.products || [];
    const Option = Select.Option;

    let selectedCat = null;
    let cats = <div className="block">Ангилал байхгүй байна</div>;

    if (promoCats && promoCats.length) {
      cats = (
        <div className="block">
          <div className="accordion" id="accordionExample">
            <div
              id="collapseOne"
              className="collapse show"
              aria-labelledby="headingOne"
              data-parent="#accordionExample"
            >
              <div className="collapse-content">
                <ul className="list-unstyled">
                  {promoCats.map((cat, index) => {
                    return (
                      <li key={index}>
                        <a href="#">{cat.promotnm}</a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
    }

    let filters =
      attributes &&
      attributes.map((attr, index) => (
        <FilterSet
          key={index}
          onAttributeChange={this.handleAttributeChange}
          onPriceAfterChange={this.handlePriceAfterChange}
          minPrice={this.state.minPrice}
          maxPrice={this.state.maxPrice}
          data={attr}
        />
      ));

    filters = (
      <div>
        <h5 className="title">
          <strong>Шүүлтүүр</strong>
        </h5>
        <div className="left-filter">{filters}</div>
      </div>
    );

    let result = null;
    if (this.state.isListViewOn) {
      result = (
        <CardList
          type={CARD_LIST_TYPES.list}
          items={products}
          cardType={CARD_TYPES.list}
        />
      );
    } else {
      result = (
        <CardList
          type={CARD_LIST_TYPES.horizontal}
          items={products}
          showAll
          cardType={CARD_TYPES.wide}
        />
      );
    }

    return (
      <div className="top-container">
        <div className="section">
          <div className="container pad10">
            <div className="e-breadcrumb">
              <ul className="list-unstyled">
                {/* {parentCats &&
                  parentCats.map(category => {
                    return (
                      <li key={category.catnm}>
                        <a href={category.route ? category.route : ""}>
                          <span>{category.catnm}</span>
                        </a>
                      </li>
                    );
                  })} */}
              </ul>
            </div>
            <div className="row row10">
              <div className="col-xl-3 pad10">
                <div className="text-right d-block d-md-none">
                  <a href=" " className="btn btn-gray btn-filter">
                    <i className="fa fa-filter" aria-hidden="true" />
                    <span className="text-uppercase">Шүүлтүүр</span>
                  </a>
                </div>
                <div className="left-panel">
                  <h5 className="title">
                    <strong>Хайлтын үр дүн</strong>
                  </h5>
                  <p className="title">
                    <span>Ангилал</span>
                  </p>
                  {cats}
                  {filters}
                </div>
              </div>
              <div className="col-xl-9 col-lg-9 col-md-8 pad10">
                <div className="list-filter">
                  <div className="row row10">
                    <div className="col-lg-6 pad10">
                      <div className="total-result">
                        <p className="text">
                          <strong>"{selectedCat}"</strong> {products.length}{" "}
                          бараа олдлоо
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-6 pad10">
                      <form className="flex-this end">
                        <div className="form-group my-select flex-this">
                          <label
                            htmlFor="inputState"
                            style={{
                              marginTop: "7px",
                              marginRight: "5px"
                            }}
                          >
                            Эрэмбэлэх:
                          </label>
                          <Select
                            defaultValue={this.state.sort}
                            onChange={this.handleSortChange}
                            className="form-control"
                            id="inputState"
                          >
                            <Option value="price_desc">Үнэ буурахаар</Option>
                            <Option value="price_asc">Үнэ өсөхөөр</Option>
                          </Select>
                        </div>
                        <div className="form-group flex-this">
                          <Link
                            to=""
                            className={
                              this.state.isListViewOn ? "btn active" : "btn"
                            }
                            onClick={this.handleListViewClick}
                          >
                            <i className="fa fa-th-list" aria-hidden="true" />
                          </Link>
                          <Link
                            to=""
                            className={
                              this.state.isListViewOn ? "btn" : "btn active"
                            }
                            onClick={this.handleGridViewClick}
                          >
                            <i className="fa fa-th" aria-hidden="true" />
                          </Link>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                <Spin spinning={this.state.loading}>{result}</Spin>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Season;
