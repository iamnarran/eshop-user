import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Icon } from "antd";

import Category from "../../components/Category";
import MainMenu from "../../components/Menu";
import ToggleMenu from "../../components/ToggleMenu";
import ToggleCategory from "../../components/ToggleCategory";
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
      isLoginModalVisible: false,
      menucategories: []
    };
  }

  togglePopup = () => {
    this.setState({ isPopupOpen: !this.state.isPopupOpen });
  };

  toggleDropdown = () => {
    this.setState({ isDropdownOpen: !this.state.isDropdownOpen });
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
    categories.map((item, i) => {
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
    const root = [];
    /*    categories.map((item, i) => {
      if (item.parrentid === 0) {
        item.children = [];
        root.push(item);
      }
      root.map((item1, i1) => {
        if (item1.id === item.parrentid) {
          item1.children.push(item);
        }
      });
    }); */
    /*   categories.forEach(c => {
      if (c.parentid === 0) {
        c.children = [];
        root.push(c);
      }
      root.forEach(entry => {
        if (entry.id === c.parentid) {
          entry.children.push(c);
        }
      });
    }); */

    const dropdownClass = `dropdown-menu${
      this.state.isDropdownOpen ? " show" : ""
    }`;
    const searchClass = `search-mobile${
      this.state.isSearch ? " activated" : ""
    }`;
    const popupClass = `${this.props.isPopupOpen ? "activated" : ""}`;

    return (
      <div className={popupClass}>
        <div className="fixed-mobile-menu">
          <div className="single">
            <ul className="list-unstyled flex-this flex-space top-1">
              <li className="list-inline-item">
                <Link to="" className="e-phone">
                  <i className="fa fa-phone" aria-hidden="true" />
                  <strong>{staticInfo.phone}</strong>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="" className="e-help">
                  <span>Тусламж</span>
                </Link>
              </li>
            </ul>
            <ul className="list-unstyled flex-this flex-space top-2">
              <li className="list-inline-item notification">
                <Link to="">
                  <i className="fa fa-bell" aria-hidden="true" />
                  <span>5</span>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="" onClick={this.showLoginModal}>
                  <span className="text-uppercase">Нэвтрэх</span>
                </Link>
              </li>
            </ul>
          </div>
          <ToggleMenu dataSource={menu} />
          <ToggleCategory dataSource={menucategories} />
        </div>

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
                                  Бүх бараа
                                </button>
                                <div
                                  className={dropdownClass}
                                  aria-labelledby="dropdownMenuButton"
                                >
                                  {menucategories.map((entry, index) => {
                                    return (
                                      <Link
                                        className="dropdown-item"
                                        to=""
                                        key={index}
                                      >
                                        <img
                                          src={IMAGE + entry.icon}
                                          alt="category"
                                        />
                                        <span>{entry.name}</span>
                                      </Link>
                                    );
                                  })}
                                </div>
                              </div>
                            </li>
                            <li className="search-form">
                              <div className="form-group">
                                <label
                                  htmlFor="exampleInputEmail"
                                  className="sr-only"
                                >
                                  Main-search
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                  placeholder="Бүгдээс хайх"
                                />
                              </div>
                            </li>
                            <li>
                              <button type="submit" className="btn">
                                <i
                                  className="fa fa-search d-block d-sm-none"
                                  style={{ fontSize: "20px", margin: "5px" }}
                                />
                                <span className="text-uppercase d-none d-sm-block">
                                  Хайх
                                </span>
                              </button>
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
