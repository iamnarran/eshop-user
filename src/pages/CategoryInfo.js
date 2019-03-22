import React from "react";
import { Link } from "react-router-dom";
import { Collapse } from "react-collapse";
import { Checkbox, Spin, Slider, Select } from "antd";
import MatCheckbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { toast } from "react-toastify";

import api from "../api";
import { CARD_LIST_TYPES, CARD_TYPES } from "../utils/consts";
import CardList from "../components/CardList";
import SearchList from "../components/SearchList";

class CategoryInfo extends React.Component {
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
      products: []
    };
  }

  componentDidMount() {
    this.setState({
      products: this.props.container.products
    });
  }

  notify = message => toast(message, { autoClose: 5000 });

  fetchProductData = ({ catId, checkedList, minPrice, maxPrice, sort }) => {
    this.setState({ loading: true });

    const data = {
      catid: catId,
      parameters: checkedList,
      minprice: minPrice,
      maxprice: maxPrice,
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
    console.log("sort", value);
    const { checkedList, minPrice, maxPrice, sort } = this.state;

    const params = {
      catId: this.props.container.id,
      checkedList,
      minPrice,
      maxPrice,
      sort
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
    const { id, parentCats, subCats, attributes } = this.props.container;
    const { products } = this.state;
    const Option = Select.Option;

    let cats = <div className="block">Ангилал байхгүй байна</div>;

    if (parentCats.length) {
      cats = parentCats.map((parent, index) => {
        if (parent.id === parseInt(id)) {
          return (
            <div key={index} className="block">
              <div className="accordion">
                <Link
                  to=""
                  className="collapse-title"
                  data-toggle="collapse"
                  data-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  {parent.catnm}
                </Link>
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
                              <a href={sub.route ? sub.route : ""}>
                                {sub.catnm}
                              </a>
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
      attributes.map((attr, index) => {
        switch (attr.type) {
          case "COLOR":
            return (
              <div key={attr.type}>
                <a className="collapse-title">{attr.attributes[0].name}</a>
                <Collapse isOpened={true}>
                  <div className="collapse show" id="collapseThree">
                    <div className="collapse-content">
                      <ul className="list-unstyled">
                        {attr.attributes[0].values.map(val => {
                          return (
                            <MatCheckbox
                              key={val.valueid}
                              onChange={this.handleAttributeChange}
                              value={val.valueid}
                              style={{
                                color: val.valuecd,
                                width: 25,
                                height: 25
                              }}
                              icon={
                                <CheckBoxOutlineBlankIcon
                                  style={{ fontSize: 20 }}
                                />
                              }
                              checkedIcon={
                                <CheckBoxIcon style={{ fontSize: 20 }} />
                              }
                            />
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </Collapse>
              </div>
            );
          // case "BRAND":
          case "PRICE":
            const formatter = new Intl.NumberFormat("en-US");
            const min = parseInt(
              attr.attributes[0].values.find(val => val.valuecd === "MIN")
                .valuename
            );
            const max = parseInt(
              attr.attributes[0].values.find(val => val.valuecd === "MAX")
                .valuename
            );
            const step = Math.ceil((max - min) / 100);
            const marks = {
              [min]: {
                label: <strong>{formatter.format(min)}₮</strong>
              },
              [max]: {
                label: <strong>{formatter.format(max)}₮</strong>
              }
            };
            return (
              <div key={attr.type}>
                <a className="collapse-title">{attr.attributes[0].name}</a>
                <Slider
                  range
                  defaultValue={[this.state.minPrice, this.state.maxPrice]}
                  min={min}
                  max={max}
                  step={step}
                  marks={marks}
                  onAfterChange={this.handlePriceAfterChange}
                  style={{ width: "90%" }}
                />
              </div>
            );
          default:
            const list = attr.attributes.map((attribute, index) => (
              <div key={index}>
                <a
                  className="collapse-title"
                  data-toggle="collapse"
                  role="button"
                  aria-expanded="true"
                  aria-controls="collapseExample"
                >
                  {attribute.name}
                </a>
                <div className="collapse show" id="collapseThree">
                  <div className="collapse-content">
                    <ul className="list-unstyled">
                      {attribute.values.map((val, index) => (
                        <li key={index}>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id={`checkbox${val.valueid}${index}`}
                              onChange={this.handleAttributeChange}
                              value={val.valueid}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor={`checkbox${val.valueid}${index}`}
                            >
                              {val.valuename}
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ));
            return <div key={attr.type}>{list}</div>;
        }
      });

    if (products.length) {
      filters = (
        <div>
          <h5 className="title">
            <strong>Шүүлтүүр</strong>
          </h5>
          <div className="left-filter">{filters}</div>
        </div>
      );
    } else {
      filters = null;
    }

    let result = null;
    if (this.state.isListViewOn) {
      result = <SearchList products={products} />;
      // result = (
      //   <CardList
      //     type={CARD_LIST_TYPES.list}
      //     items={products}
      //     cardType={CARD_TYPES.list}
      //   />
      // );
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
                {parentCats.map(category => {
                  return (
                    <li key={category.catnm}>
                      <a href={category.route ? category.route : ""}>
                        <span>{category.catnm}</span>
                      </a>
                    </li>
                  );
                })}
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
                    <div className="col-lg-4 pad10">
                      <div className="total-result">
                        <p className="text">
                          <strong>{products.length}</strong> бараа олдлоо
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-8 pad10">
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
                          {/* <select
                            id="inputState"
                            className="form-control"
                            value={this.state.sort}
                            onChange={this.handleSortChange}
                          >
                            <option value="price_desc">Үнэ буурахаар</option>
                            <option value="price_asc">Үнэ өсөхөөр</option>
                          </select> */}
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
