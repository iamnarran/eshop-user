import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Icon } from "antd";
import Category from "../../components/Category";
import MainMenu from "../../components/Menu";
import LoginModal from "../../components/LoginModal";
import UserButton from "../../components/UserButton";
import CartButton from "../../components/CartButton";
import { IMAGE } from "../../utils/consts";

import "./style.css";

class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopupOpen: false,
      isDropdownOpen: false,
      isSearchDropdownOpen: false,
      isLoginModalVisible: false,
      menucategories: [],
      item: "Бүх бараа"
    };
  }
  onItem = (e, item) => {
    this.setState({ item: item.name });
  };
  onItem1 = e => {
    this.setState({ item: "Бүх бараа" });
  };

  togglePopup = () => {
    this.props.onChange();
  };

  toggleDropdown = () => {
    this.setState({ isDropdownOpen: !this.state.isDropdownOpen });
  };

  searchDropdown = () => {
    this.setState({ isSearchDropdownOpen: !this.state.isSearchDropdownOpen });
  };

  toggleLoginModal = () => {
    this.setState({ isLoginModalVisible: !this.state.isLoginModalVisible });
  };

  showLoginModal = () => {
    this.setState({ isLoginModalVisible: true });
  };

  hideLoginModal = () => {
    this.setState({ isLoginModalVisible: false });
  };

  componentWillMount() {
    const { categories } = this.props.container;

    let root = [];
    categories.map(item => {
      if (item.parentid === 0) {
        item.children = [];
        root.push(item);
      }
    });

    root.map((item, i) => {
      categories.map((item1, i1) => {
        if (item.id == item1.parentid) {
          item.children.push(item1);
        }
      });
    });

    this.setState({ menucategories: root });
  }

  render() {
    const { staticInfo, menu, categories } = this.props.container;
    const { menucategories } = this.state;
    const dropdownClass = `dropdown-menu${
      this.state.isDropdownOpen ? " show" : ""
    }`;
    const searchClass = `search-mobile${
      this.state.isSearch ? " activated" : ""
    }`;
    return (
      <div>
        <div className="wrap">
          <div className="top-container">
            <div className="top-nav">
              <div className="container container-laptop pad10">
                <div className="row row10">
                  <div className="col-lg-6 col-md-6 d-none d-md-block pad10">
                    <ul className="list-inline left-panel">
                      <li className="list-inline-item">
                        <Link to="" className="e-phone">
                          <Icon
                            type="phone"
                            theme="filled"
                            style={{ color: "rgba(254, 180, 21, 1)" }}
                          />
                          <strong> {staticInfo.phone} </strong>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-6 col-md-6 d-none d-md-block  pad10">
                    <div className="text-right">
                      <ul className="list-inline right-panel">
                        <li className="list-inline-item">
                          <form>
                            <select className="classic" defaultValue="0">
                              <option value="0" defaultValue>
                                МОН
                              </option>
                              <option value="1">ENG</option>
                            </select>
                          </form>
                        </li>
                        <UserButton onUserButtonClick={this.showLoginModal} />
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="top-main">
              <div className="container container-laptop pad10">
                <div className="row row10">
                  <div className="col-xl-8 col-lg-8 col-md-5 col-4 pad10">
                    <div className="flex-this flex-space">
                      <button
                        className="d-block d-md-none button buttonGrey"
                        onClick={this.togglePopup}
                      >
                        <i className="fa fa-navicon" aria-hidden="true" />
                      </button>
                      <Link to="/" className="logo">
                        <img alt="logo" src={IMAGE + staticInfo.logopath} />
                      </Link>
                      <div className="search">
                        <form className={searchClass}>
                          <ul className="list-unstyled list-float clr mainsearch">
                            <li>
                              <div
                                className="dropdown"
                                onClick={this.toggleDropdown}
                              >
                                <button
                                  className="btn dropdown-toggle"
                                  type="button"
                                  id="dropdownMenuButton"
                                  data-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                >
                                  {this.state.item}
                                </button>
                                <div
                                  className={dropdownClass}
                                  aria-labelledby="dropdownMenuButton"
                                >
                                  <a
                                    className="dropdown-item"
                                    onClick={e => this.onItem1(e)}
                                  >
                                    <span>Бүх бараа</span>
                                  </a>
                                  {menucategories.map((entry, index) => {
                                    return (
                                      <a
                                        className="dropdown-item"
                                        key={index}
                                        onClick={e => this.onItem(e, entry)}
                                      >
                                        <img
                                          src={IMAGE + entry.icon}
                                          alt="category"
                                        />
                                        <span>{entry.name}</span>
                                      </a>
                                    );
                                  })}
                                </div>
                              </div>
                            </li>
                            <li className="search-form">
                              <div className="form-group">
                                <label
                                  htmlFor="exampleInputEmail1"
                                  className="sr-only"
                                >
                                  Main-search
                                </label>
                                <input
                                  type="email"
                                  className="form-control"
                                  placeholder="Бүгдээс хайх"
                                />
                                <ul className="list-unstyled">
                                  <li>
                                    <a href="#">
                                      <span>Сүү</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <span>Талх</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <span>Хонины мах</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <span>Хүнсний ногоо</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <span>Алим</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <span>Сүү</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <span>Талх</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <span>Хонины мах</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <span>Хүнсний ногоо</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <span>Алим</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <span>Сүү</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <span>Талх</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <span>Хонины мах</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <span>Хүнсний ногоо</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <span>Алим</span>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </li>
                            <li>
                              <Link className="btn" to="/CategoryInfo">
                                <i
                                  className="fa fa-search d-block d-sm-none"
                                  style={{ fontSize: "20px", margin: "5px" }}
                                />
                                <span
                                  className="text-uppercase d-none d-sm-block"
                                  style={{ color: "black" }}
                                >
                                  Хайх
                                </span>
                              </Link>
                            </li>
                          </ul>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-7 col-8 pad10">
                    <div className="action">
                      <ul className="list-inline text-right">
                        <li className="list-inline-item">
                          <Link
                            to=""
                            className="flex-this search-mobile-btn d-flex d-lg-none row10"
                            onClick={this.toggleSearch}
                          >
                            <i className="fa fa-search" />
                            <p>
                              <small>Хайлт</small>
                              <span className="text-uppercase">хийх</span>
                            </p>
                          </Link>
                        </li>
                        <li className="list-inline-item">
                          <Link to="" className="row10">
                            <Icon type="heart" theme="filled" />
                            <p>
                              <small>Хадгалсан</small>
                              <span className="text-uppercase">бараа</span>
                            </p>
                          </Link>
                        </li>
                        <li className="list-inline-item">
                          <CartButton />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="main-nav">
              <div className="container container-laptop pad10">
                <ul className="list-inline">
                  <li className="list-inline-item active">
                    <Link to="/">
                      <Icon
                        type="home"
                        theme="filled"
                        style={{ color: "#feb415" }}
                      />
                    </Link>
                  </li>
                  <li className="list-inline-item has-drop">
                    <Link to="">
                      <span>Ангилал</span>
                      <Icon type="down" style={{ color: "#feb415" }} />
                    </Link>

                    <div className="drop-container">
                      <div className="container pad10">
                        <Category dataSource={menucategories} />
                      </div>
                    </div>
                  </li>
                  <MainMenu dataSource={menu} />
                </ul>
              </div>
            </div>
          </div>
        </div>
        <LoginModal
          onVisibilityChange={this.toggleLoginModal}
          visible={this.state.isLoginModalVisible}
        />
      </div>
    );
  }
}

export default AppHeader;
