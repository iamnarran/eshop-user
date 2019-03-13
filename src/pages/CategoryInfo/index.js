import React from "react";
import CardList from "../../components/CardList";
import { CARD_TYPES, CARD_LIST_TYPES } from "../../utils/consts";
import { SearchList } from "../../components";
import { Checkbox, Progress, Col } from "antd";
import { Menu } from "antd";
const SubMenu = Menu.SubMenu;
const CheckboxGroup = Checkbox.Group;
const plainOptions = [
  { label: "Apple", value: "Apple" },
  { label: "Pear", value: "Pear" },
  { label: "Orange", value: "Orange" }
];
class CategoryInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: false,
      isSort: false,
      openKeys: ["sub01"],
      products: this.props.container,
      checkedValues: []
    };

    this.handleClick = this.handleClick.bind(this);
  }

  rootSubmenuKeys = ["sub01", "sub02", "sub04", "sub04"];

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
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

  onChange = val => {
    console.log(val);
  };

  render() {
    const products = this.props.container.categoryProduct[0].products;
    const SubCategory = this.props.container.categoryProduct[0].SubCategorys;
    const attributes = this.props.container.categoryProduct[0].attributes;
    let filters = null;
    let colorList = null;
    let category = null;

    category = SubCategory.map((item, index) => {
      return (
        <li key={index}>
          <a>{item.catnm}</a>
        </li>
      );
    });

    filters = attributes.map((item, index) => {
      switch (item.type) {
        case "ATTRIBUTE":
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
                  <div class="collapse show" id="collapseThree">
                    <div class="collapse-content">
                      <ul class="list-unstyled">
                        {
                          <Checkbox.Group
                            style={{ width: "100%" }}
                            onChange={this.onChange}
                          >
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
                        }
                      </ul>
                    </div>
                  </div>
                </div>
              );
            });
          } else return null;
          return <div>{filter}</div>;
        case "COLOR":
          if (item.attributes[0].values) {
            colorList = item.attributes[0].values.map((item, index) => {
              return (
                <a
                  key={index}
                  className="dot"
                  style={{
                    height: "25px",
                    width: "25px",
                    backgroundColor: item.valuecd,
                    borderRadius: "50%",
                    display: "inline-block",
                    marginTop: "10px",
                    marginRight: "10px"
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
          return null;
      }
    });

    return (
      <div className="section" style={{ minHeight: "2" }}>
        <div className="container pad10">
          <div className="e-breadcrumb">
            <ul className="list-unstyled">
              <li>
                <a href="/">
                  <span>Эхлэл</span>
                </a>
              </li>
              <li>
                <a href=" ">
                  <span>Ангилал</span>
                </a>
              </li>
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
                    <a
                      href="#"
                      className="collapse-title"
                      data-toggle="collapse"
                      data-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      Цай / Кофе
                    </a>
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
                        <strong>"{SubCategory.catnm}"</strong>
                        <span>{products.length} бараа олдлоо</span>
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
                          <option>Үнэ ихээс багаруу</option>
                          <option>Үнэ багаас ихрүү</option>
                        </select>
                      </div>
                      <div className="form-group flex-this">
                        <a
                          className={
                            this.state.isToggleOn ? "btn active" : "btn"
                          }
                          onClick={this.handleClick}
                        >
                          <i className="fa fa-th-list" aria-hidden="true" />
                        </a>
                        <a
                          className={
                            this.state.isToggleOn ? "btn" : "btn active"
                          }
                          onClick={this.handleClick}
                        >
                          <i className="fa fa-th" aria-hidden="true" />
                        </a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              {this.state.isToggleOn ? (
                <SearchList products={products} />
              ) : (
                <CardList
                  type={CARD_LIST_TYPES.horizontal}
                  items={products}
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
{
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
}
