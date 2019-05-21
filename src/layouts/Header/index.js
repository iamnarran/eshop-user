import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Icon } from "antd";

import Category from "../../components/Category";
import MainMenu from "../../components/Menu";
import UserButton from "../../components/UserButton";
import CartButton from "../../components/CartButton";
import LoginModal from "../../components/LoginModal";
import RegisterModal from "../../components/RegisterModal";
import { IMAGE } from "../../utils/consts";
import api from "../../api";
import searchImage from "../../scss/assets/svg/001-search.svg";
import heartImage from "../../scss/assets/svg/003-chat.svg";
import navImage from "../../scss/assets/svg/list.svg";

import "./style.css";

class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopupOpen: false,
      isDropdownOpen: false,
      isSearchDropdownOpen: false,
      menucategories: [],
      item: "Бүх бараа",
      suggestion: [],
      word: "",
      k: [],
      isSearch: false
    };
  }

  handleChange = e => {
    api.search
      .findHistorySuggestion({ custid: "14", word: this.state.word })
      .then(res => {
        console.log(res.success);
      });
  };

  onSuggestion = e => {
    const { suggestion } = this.state;
    suggestion.map((item, i) => {
      if (e.target.value == item.keyword) {
        this.setState({ k: item });
      }
    });
    this.setState({
      word: e.target.value
    });
    if (this.state.word.length >= 1) {
      api.search
        .findSuggestion({ keyword: e.target.value, rownum: 10 })
        .then(res => {
          if (res.success) {
            this.setState({
              suggestion: res.data
            });
          }
        });
    }
  };

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

  toggleSearch = () => {
    this.setState({ isSearch: !this.state.isSearch });
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
      this.state.isSearch ? " activated" : " "
    }`;
    return (
      <div className="wrap" id="main-header">
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
                      <UserButton />
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
                      {/* <i className="fa fa-navicon" aria-hidden="true" /> */}
                      <img
                        src={navImage}
                        alt="mobile navigation"
                        height="25px"
                      />
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
                                className="input"
                                style={{ margin: "0px", width: "100%" }}
                              >
                                <input
                                  list="cat"
                                  type="text"
                                  className="form-control"
                                  placeholder="Бүгдээс хайх"
                                  onChange={e => this.onSuggestion(e)}
                                />
                                <datalist id="cat" className="list-unstyled">
                                  {this.state.suggestion.map(item => {
                                    return (
                                      <option
                                        key={item.id}
                                        value={item.keyword}
                                      />
                                    );
                                  })}
                                </datalist>
                              </label>
                            </div>
                          </li>
                          <li>
                            <Link
                              className="btn"
                              to={
                                this.state.word
                                  ? "/search/" + this.state.word
                                  : ""
                              }
                              onClick={this.handleChange}
                            >
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
                            <Link
                              to=""
                              className="btn mobile-search-cross"
                              onClick={this.toggleSearch}
                              style={{ background: "#feb415" }}
                            >
                              <i
                                className="fa fa-remove d-block d-sm-none"
                                style={{ fontSize: "20px", margin: "5px" }}
                              />
                              <span
                                className="text-uppercase d-none d-sm-block"
                                style={{ color: "black" }}
                              >
                                Хаах
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
                          {/* <i className="fa fa-search" /> */}
                          <img src={searchImage} alt="search" height="25px" />
                          <p>
                            <small>Хайлт</small>
                            <span className="text-uppercase">хийх</span>
                          </p>
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link to="" className="row10">
                          {/* <Icon type="heart" theme="filled" /> */}
                          <img src={heartImage} alt="wishlist" height="25px" />
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
        <LoginModal />
        <RegisterModal />
      </div>
    );
  }
}

export default AppHeader;
