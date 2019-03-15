import React from "react";
import CardList from "../../components/CardList";
import { CARD_TYPES, CARD_LIST_TYPES } from "../../utils/consts";
import { SearchList } from "../../components";
import { Checkbox, Progress, Col, Menu } from "antd";
import { Link } from "react-router-dom";
import api from "../../api";
const SubMenu = Menu.SubMenu;

let temp = [];

class CategoryInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: false,
      isSort: true,
      openKeys: ["sub01"],
      products: [],
      checkedValues: [],
      value: []
    };
    this.checkref = React.createRef();
    this.handleClickList = this.handleClickList.bind(this);
    this.handleClickGrid = this.handleClickGrid.bind(this);

    this.handleClickAsc = this.handleClickAsc.bind(this);
    this.handleClickDesc = this.handleClickDesc.bind(this);
  }

  rootSubmenuKeys = ["sub01", "sub02", "sub04", "sub04"];

  handleClickAsc() {
    console.log("this is asc");
  }
  handleClickDesc() {
    console.log("this is desc");
  }

  handleClickList() {
    this.setState({ isToggleOn: true });
  }

  handleClickGrid() {
    this.setState({ isToggleOn: false });
  }

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(
      key => this.state.openKeys.indexOf(key) === -1
    );
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : []
      });
    }
  };

  onChangeCheckbox = e => {
    /* console.log(this.checkref.current.props);
    console.log(this.props); */
    console.log(e);
    /* this.onSubmit();
    this.props.updateFilter(val); */
  };

  onSubmit = e => {
    e.preventDefault();
    console.log(
      "sda",
      e
    ); /* 
    let tmp = this.state.checkedValues;
    console.log(e);
    tmp.push(e.target.value);
    this.setState({ checkedValues: tmp });
    console.log("checkedValue", this.state.checkedValues); */
  };

  componentWillMount() {
    this.setState({
      products: this.props.container.categoryProduct[0].products[0]
    });
  }

  render() {
    console.log(this.props);
    const SubCategory = this.props.container.categoryProduct[0].SubCategorys;
    const attributes = this.props.container.categoryProduct[0].attributes;
    const parent = this.props.container.categoryProduct[0].parents;
    const length = SubCategory ? SubCategory[0].parentid : null;
    let filters = null;
    let colorList = null;
    let category = null;
    let parentCategory1 = null;

    parent.map((item, index) => {
      if (item.id == length) {
        parentCategory1 = item.catnm;
        return <p>{item.catnm}</p>;
      } else return null;
    });

    category = SubCategory.map((item, index) => {
      return (
        <li key={index}>
          <Link to={item.route ? item.route : " "}>{item.catnm}</Link>
        </li>
      );
    });

    filters = attributes.map((item, index) => {
      switch (item.type) {
        case "COLOR":
          if (item.attributes[0].values) {
            colorList = item.attributes[0].values.map((item, index) => {
              return (
                <a
                  onClick={this.onSubmit}
                  key={index}
                  className="dot"
                  style={{
                    height: "25px",
                    width: "25px",
                    backgroundColor: item.valuecd,
                    borderRadius: "50%",
                    display: "inline-block",
                    marginTop: "10px",
                    marginRight: "10px",
                    border: "1px solid grey"
                  }}
                />
              );
            });
          } else return null;
          return (
            <div>
              <a className="collapse-title">Өнгө</a>
              {colorList}
            </div>
          );
        case "PRICE":
          return (
            <div>
              <a className="collapse-title">Үнэ</a>
              <Progress percent={30} />
            </div>
          );
        default:
          let filter = null;
          if (item.attributes) {
            filter = item.attributes.map((item, index) => {
              return (
                <div className="left-filter" key={index}>
                  <a
                    className="collapse-title"
                    data-toggle="collapse"
                    role="button"
                    aria-expanded="true"
                    aria-controls="collapseExample"
                  >
                    {item.name}
                  </a>
                  <div className="collapse show" id="collapseThree">
                    <div className="collapse-content">
                      <ul className="list-unstyled">
                        {item.values.map((it, ind) => {
                          return (
                            <li>
                              <Checkbox
                                name={item.id}
                                value={it.valueid}
                                onClick={this.onSubmit}
                              >
                                {it.valuename}
                              </Checkbox>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            });
          } else return null;
          return <div>{filter}</div>;
      }
    });

    return (
      <div className="section" style={{ minHeight: "2" }}>
        <div className="container pad10">
          <div className="e-breadcrumb">
            <ul className="list-unstyled">
              {parent.map((item, index) => {
                return (
                  <li key={index}>
                    <Link to={item.route ? item.route : " "}>
                      <span>{item.catnm}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="row row10">
            <div className="col-xl-3 col-lg-3 col-md-4 pad10">
              <div className="text-right d-block d-md-none">
                <a href=" " className="btn btn-gray btn-filter">
                  <i className="fa fa-filter" aria-hidden="true" />
                  <span className="text-uppercase">Шүүлтүүр</span>
                </a>
              </div>
              <div className="left-panel">
                {/* <a href=" " className="d-block d-md-none">
                  <i className="fa fa-times" aria-hidden="true" />
                </a> */}
                <h5 className="title">
                  <strong>Хайлтын үр дүн</strong>
                </h5>
                <p className="title">
                  <span>Ангилал</span>
                </p>
                <div className="block">
                  <div className="accordion" id="accordionExample">
                    <Link
                      to=" "
                      className="collapse-title"
                      data-toggle="collapse"
                      data-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      {parentCategory1}
                    </Link>
                    <div
                      id="collapseOne"
                      className="collapse show"
                      aria-labelledby="headingOne"
                      data-parent="#accordionExample"
                    >
                      <div className="collapse-content">
                        <ul className="list-unstyled">{category}</ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="block">
                  <div
                    id="collapseOne"
                    className="collapse show"
                    aria-labelledby="headingOne"
                    data-parent="#accordionExample"
                  >
                    <div className="collapse-content">
                      <ul className="list-unstyled" />
                    </div>
                  </div>
                </div>
                {filters}
              </div>
            </div>
            <div className="col-xl-9 col-lg-9 col-md-8 pad10">
              <div className="list-filter">
                <div className="row row10">
                  <div className="col-lg-4 pad10">
                    <div className="total-result">
                      <p className="text">
                        <strong>"{parentCategory1} "</strong>
                        <span>{this.state.products.length} бараа олдлоо</span>
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-8 pad10">
                    <form className="flex-this end">
                      <div className="form-group my-select flex-this">
                        <label for="inputState" style={{ marginTop: "5px" }}>
                          Эрэмбэ:
                        </label>
                        <select id="inputState" className="form-control">
                          <option>
                            <a onClick={this.handleClickDesc}>
                              <span>Үнэ ихээс багаруу</span>
                            </a>
                          </option>
                          <option>
                            <a onClick={this.handleClickAsc}>
                              <span>Үнэ багаас ихрүү</span>
                            </a>
                          </option>
                        </select>
                      </div>
                      <div className="form-group flex-this">
                        <a
                          className={
                            this.state.isToggleOn ? "btn active" : "btn"
                          }
                          onClick={this.handleClickList}
                        >
                          <i className="fa fa-th-list" aria-hidden="true" />
                        </a>
                        <a
                          className={
                            this.state.isToggleOn ? "btn" : "btn active"
                          }
                          onClick={this.handleClickGrid}
                        >
                          <i className="fa fa-th" aria-hidden="true" />
                        </a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              {this.state.isToggleOn ? (
                <SearchList
                  products={
                    this.state.isSort
                      ? this.state.products
                      : this.state.products.reverse()
                  }
                />
              ) : (
                <CardList
                  type={CARD_LIST_TYPES.horizontal}
                  items={
                    this.state.isSort
                      ? this.state.products
                      : this.state.products.reverse()
                  }
                  showAll
                  cardType={CARD_TYPES.wide}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CategoryInfo;

/* <Menu
                key={index}
                mode="inline"
                openKeys={this.state.openKeys}
                onOpenChange={this.onOpenChange}
                style={{ width: 256 }}
              >
                <SubMenu
                  title={
                    <span>
                      <span>{item.name}</span>
                    </span>
                  }
                >
                  {item.values.map((it, ind) => {
                    return (
                      <Menu.Item key={ind} style={{ color: "white" }}>
                        <Checkbox onChange={sd => console.log(sd)}>
                          {it.valuename}
                        </Checkbox>
                      </Menu.Item>
                    );
                  })}
                </SubMenu>
              </Menu> */

/*
                          <Checkbox.Group
                            style={{ width: "100%" }}
                            onChange={this.onChangeCheckbox}
                            ref={this.checkref}
                            name="aaaaaaaaaaaaaaa"
                          >
                            {item.id}
                            <Col>
                              {item.values.map((it, ind) => {
                                return (
                                  <li>
                                    <Checkbox value={it.valueid}>
                                      {it.valuename}
                                    </Checkbox>
                                  </li>
                                );
                              })}
                            </Col>
                          </Checkbox.Group>
                        */
