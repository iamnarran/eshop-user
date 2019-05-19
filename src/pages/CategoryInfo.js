import React from "react";
import { Link } from "react-router-dom";
import { Spin, Select } from "antd";
import { toast } from "react-toastify";

import api from "../api";
import {
  CARD_LIST_TYPES,
  CARD_TYPES,
  PRODUCTS_PER_PAGE
} from "../utils/consts";
import CardList from "../components/CardList";
import FilterSet from "../components/FilterSet";
import crossImage from "../scss/assets/svg/error.svg";

class CategoryInfo extends React.Component {
  constructor(props) {
    super(props);

    let min,
      max = 0;

    const attributes = props.container.attributes;
    attributes &&
      attributes.forEach(attr => {
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
      products: this.props.container.products || [],
      isLeftPanel: false
    };
  }

  componentDidUpdate(prevProps) {
    const prevProducts = prevProps.container.products;
    const thisProducts = this.props.container.products;
    let areProductsEqual = true;

    if (prevProducts.length === thisProducts.length) {
      for (let i = 0; i < prevProducts.length; i++) {
        if (prevProducts[i].cd !== thisProducts[i].cd) {
          areProductsEqual = false;
          break;
        }
      }
      if (!areProductsEqual) {
        this.setState({
          products: thisProducts
        });
      }
    } else {
      this.setState({
        products: thisProducts
      });
    }
  }

  notify = message => toast(message, { autoClose: 5000 });

  fetchProductData = ({ catId, checkedList, minPrice, maxPrice, sort }) => {
    this.setState({ loading: true });

    const data = {
      catid: catId,
      parameters: checkedList,
      minprice: minPrice,
      maxprice: maxPrice,
      startsWith: 0,
      rowCount: PRODUCTS_PER_PAGE,
      orderCol: sort
    };

    api.categoryInfo.findAllFilteredInfo(data).then(res => {
      if (res.success) {
        this.setState({
          products: res.data
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

    this.setState({ checkedList });

    const params = {
      catId: this.props.container.id,
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

  showLeftPanel = e => {
    this.setState({ isLeftPanel: !this.state.isLeftPanel });
    console.log(this.state.isLeftPanel);
  };

  render() {
    const { id, parentCats, subCats, attributes } = this.props.container;
    const { products } = this.state;
    const Option = Select.Option;
    const leftPanel = `left-panel${this.state.isLeftPanel ? " show" : ""}`;

    let selectedCat = null;
    let cats = <div className="block">Ангилал байхгүй байна</div>;

    if (parentCats && parentCats.length) {
      cats = parentCats.map((parent, index) => {
        if (parent.id === parseInt(id)) {
          selectedCat = parent.catnm;
          return (
            <div key={index} className="block">
              <div className="accordion">
                <h6
                  style={{
                    marginLeft: "10px",
                    marginTop: "10px",
                    marginBotton: "0"
                  }}
                >
                  {parent.catnm}
                </h6>
                <div
                  id="collapseOne"
                  className="collapse show"
                  aria-labelledby="headingOne"
                  data-parent="#accordionExample"
                >
                  <div className="collapse-content">
                    <ul className="list-unstyled">
                      {subCats.map((sub, index) => {
                        if (sub.parentid === parent.id) {
                          return (
                            <li key={index}>
                              <Link to={sub.route ? sub.route : ""}>
                                {sub.catnm}
                              </Link>
                            </li>
                          );
                        }
                        return null;
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        }
        return null;
      });
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
                {parentCats &&
                  parentCats.map(category => {
                    return (
                      <li key={category.catnm}>
                        <Link to={category.route ? category.route : ""}>
                          <span>{category.catnm}</span>
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div className="row row10">
              <div className="col-xl-3 pad10">
                <div className={leftPanel}>
                  <button
                    className="button buttonBlack filter-cross"
                    onClick={this.showLeftPanel}
                  >
                    <img
                      src={crossImage}
                      alt="cross"
                      height="25px"
                      aria-hidden="true"
                    />
                  </button>
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
                        <div className="text-right d-block d-md-none">
                          <a
                            className="btn btn-gray btn-filter"
                            onClick={this.showLeftPanel}
                          >
                            <i className="fa fa-filter" aria-hidden="true" />
                            <span className="text-uppercase">Шүүлтүүр</span>
                          </a>
                        </div>
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

export default CategoryInfo;
