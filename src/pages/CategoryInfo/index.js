import React from "react";
import CardList from "../../components/CardList";
import { CARD_TYPES, CARD_LIST_TYPES } from "../../utils/consts";
import { SearchList } from "../../components";
import { Checkbox, Progress } from "antd";
import { Menu } from "antd";
const SubMenu = Menu.SubMenu;

class CategoryInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: false,
      isSort: false,
      openKeys: ["sub01"],
      products: this.props.container
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

  render() {
    const products = this.props.container.categoryProduct[0].products;
    const SubCategory = this.props.container.categoryProduct[0].SubCategorys[0];
    const attributes = this.props.container.categoryProduct[0].attributes[0]
      .attributes;
    const ColorList = this.props.container.categoryProduct[0].attributes[1]
      ? this.props.container.categoryProduct[0].attributes[1].attributes[0]
          .values
      : null;
    let attribute = null;
    let colors = null;

    console.log("this.props", this.state.products);

    colors = ColorList.map((item, index) => {
      if (ColorList) {
        return (
          <a
            key={index}
            href=" "
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
      } else {
        return null;
      }
    });

    attribute = attributes.map((item, index) => {
      if (attributes) {
        return (
          <Menu
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
                console.log("index", ind);
                return (
                  <Menu.Item key={ind} style={{ color: "white" }}>
                    <Checkbox>{it.valuename}</Checkbox>
                  </Menu.Item>
                );
              })}
            </SubMenu>
          </Menu>
        );
      } else {
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
              <li>
                <span>{SubCategory.catnm}</span>
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
                <a href=" " className="d-block d-md-none">
                  <i className="fa fa-times" aria-hidden="true" />
                </a>
                <h5 className="title">
                  <strong>Хайлтын үр дүн</strong>
                </h5>
                <p className="title">
                  <span>Ангилал</span>
                </p>
                <div className="block">
                  {/* SubCategory.map((index, item) => {
                    return (
                      <a href="#" className="collapse-title">
                        {item.catnm}
                      </a>
                    );
                  }) */}
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
                <h5 className="title">
                  <strong>Шүүлтүүр</strong>
                </h5>
                {attribute}
                <a className="collapse-title">Үнэ</a>
                <Progress percent={30} />
                <a className="collapse-title">Өнгө</a>
                {colors}
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
