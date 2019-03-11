import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Icon } from "antd";
import { connect } from "react-redux";

// import GoogleLogin from "../../components/GoogleLogin";
/* import DropMenu from '../../components/DropMenu'; */
import Category from "../../components/Category";
import MainMenu from "../../components/Menu";
import ToggleMenu from "../../components/ToggleMenu";
import ToggleCategory from "../../components/ToggleCategory";
import LoginModal from "../../components/LoginModal";
import { signOut } from "../../actions/Login";
import FacebookLogin from "../../components/FacebookLogin";
import { IMAGE } from "../../utils/consts";
import storage from "../../utils/storage";

import "./style.css";
import { ImageCollectionsBookmark } from "material-ui/svg-icons";

@connect(
  null,
  { signOut }
)
class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isLogin: false,
      isToggle: false,
      logInVisible: false,
      SingUpVisible: false,
      isSearch: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.visible !== prevProps.visible) {
      this.setState({ visible: this.props.visible });
    }
  }

  toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });
  toggleSearch = () => this.setState({ isSearch: !this.state.isSearch });
  showLogInModal = () => this.setState({ logInVisible: true });
  handleLogInSave = () => this.setState({ logInVisible: false });
  handleLogInCancel = () => this.setState({ logInVisible: false });
  showSingUpModal = () => this.setState({ SingUpVisible: true });
  handleSingUpSave = () => this.setState({ SingUpVisible: false });
  handleSingUpCancel = () => this.setState({ SingUpVisible: false });

  togglePopup = () => {
    this.props.onChange();
  };

  handleLogout = () => {
    this.props.signOut();
    window.location.reload();
  };

  render() {
    const { staticinfo } = this.props.container;
    const { menus } = this.props.container;
    const { categories } = this.props.container;

    const root = [];
    categories.forEach(entry => {
      if (entry.parentid === 0) {
        entry.children = [];
        root.push(entry);
      }
      root.forEach(ent => {
        if (ent.id === entry.parentid) {
          ent.children.push(entry);
        }
      });
    });

    const menuClass = `dropdown-menu${this.state.isOpen ? " show" : ""}`;
    const seartchClass = `search-mobile${
      this.state.isSearch ? " activated" : ""
    }`;
    const togglePopup = `${this.props.isToggle ? " activated" : ""}`;

    let userButton = null;
    if (storage.get("user")) {
      let user = storage.get("user");
      if (user.customerInfo) {
        user = user.customerInfo;
      }

      userButton = (
        <li className="list-inline-item user">
          <Link to="" className="flex-this">
            <div className="image-container default">
              <span
                className="image"
                style={{
                  backgroundImage: `url(${user.picture ? user.picture : ""})`
                }}
              />
            </div>
            <span className="">
              {user.name ? user.name : user.email ? user.email : ""}
            </span>
          </Link>
          <div className="dropdown">
            <div className="drop-content">
              <div className="profile-menu">
                <div className="menu-header">
                  <div className="flex-this">
                    <div className="image-container default">
                      <span
                        className="image"
                        style={{
                          backgroundImage: `url(${
                            user.picture ? user.picture : ""
                          })`
                        }}
                      />
                    </div>
                    <p className="name">
                      {user.name ? user.name : user.email ? user.email : ""}
                    </p>
                  </div>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "100%" }}
                      aria-valuenow="100"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                  <p className="text text-center">
                    <strong>Таны мэдээлэл</strong>
                    <span>100% / 100%</span>
                  </p>
                </div>
                <ul className="list-unstyled">
                  <li className="active">
                    <Link to="/userprofile" className="flex-this">
                      <i className="fa fa-user" aria-hidden="true" />
                      <span>Профайл хуудас</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="" className="flex-this">
                      <i className="fa fa-check-square" aria-hidden="true" />
                      <span>Таны үзсэн барааны түүх</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="" className="flex-this">
                      <i className="fa fa-history" aria-hidden="true" />
                      <span>Худалдан авалтын түүх</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="" className="flex-this">
                      <i className="fa fa-heart" aria-hidden="true" />
                      <span>Хадгалсан бараа</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="" className="flex-this">
                      <i className="fa fa-bell" aria-hidden="true" />
                      <span>Мэдэгдэл</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="" className="flex-this">
                      <i className="fa fa-database" aria-hidden="true" />
                      <span>Купон</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="" className="flex-this">
                      <i className="fa fa-credit-card" aria-hidden="true" />
                      <span>ePoint карт</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="" className="flex-this">
                      <i className="fa fa-compass" aria-hidden="true" />
                      <span>Хүргэлтийн хаяг</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="" className="flex-this">
                      <i className="fa fa-lock" aria-hidden="true" />
                      <span>Нууц үгээ солих</span>
                    </Link>
                  </li>
                </ul>
                <div className="text-left">
                  <Link
                    onClick={this.handleLogout}
                    to=""
                    className="btn btn-gray"
                  >
                    <i className="fa fa-chevron-left" aria-hidden="true" />
                    <span className="text-uppercase">Гарах</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </li>
      );
    } else {
      userButton = (
        <li className="list-inline-item">
          <Link to="" onClick={this.showLogInModal}>
            <span className="text-uppercase">Нэвтрэх</span>
          </Link>
        </li>
      );
    }

    return (
      <div>
        <div className={togglePopup}>
          <div className="fixed-mobile-menu">
            <div className="single">
              <ul className="list-unstyled flex-this flex-space top-1">
                <li className="list-inline-item">
                  <Link to="" className="e-phone">
                    <i className="fa fa-phone" aria-hidden="true" />
                    <strong>{staticinfo.phone}</strong>
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link to="" className="e-help">
                    <span>Тусламж</span>
                  </Link>
                </li>
                {/* <li className="list-inline-item language">
                  <form>
                    <select className="custom-select" defaultValue="0">
                      <option value="0">МОН</option>
                      <option value="1">ENG</option>
                    </select>
                  </form>
                </li> */}
              </ul>
              <ul className="list-unstyled flex-this flex-space top-2">
                <li className="list-inline-item notification">
                  <Link to="">
                    <i className="fa fa-bell" aria-hidden="true" />
                    <span>5</span>
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link to="" onClick={this.showLogInModal}>
                    <span className="text-uppercase">Нэвтрэх</span>
                  </Link>
                </li>
                {/* <li className="list-inline-item">
                  <Link to="" onClick={this.showSingUpModal}>
                    <span className="text-uppercase">Бүртгүүлэх</span>
                  </Link>
                </li> */}
              </ul>
            </div>
            <ToggleMenu dataSource={menus} />
            <ToggleCategory dataSource={root} />
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
                            <strong> {staticinfo.phone} </strong>
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
                          {/* <li className="list-inline-item notification">
                            <Badge dot>
                              <Avatar
                                shape="square"
                                icon="bell"
                                theme="filled"
                                size="small"
                                style={{ lineHeight: "20px" }}
                              />
                            </Badge>
                          </li> */}
                          {userButton}
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
                        <Link to={"/"} className="logo">
                          <img alt="logo" src={IMAGE + staticinfo.logopath} />
                        </Link>
                        <div className="search">
                          <form className={seartchClass}>
                            <ul className="list-unstyled list-float clr">
                              <li>
                                <div
                                  className="dropdown"
                                  onClick={this.toggleOpen}
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
                                    className={menuClass}
                                    aria-labelledby="dropdownMenuButton"
                                  >
                                    {root.map((entry, index) => {
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
                            <Link to="" className="row10">
                              <span className="count">1</span>
                              <Icon type="shopping-cart" />
                              <p>
                                <small>Миний</small>
                                <span className="text-uppercase">сагс</span>
                              </p>
                              <strong>0₮</strong>
                            </Link>
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
                      <Link to="">
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
                          {/* <DropMenu dataSource={menus} /> */}
                          <Category dataSource={root} />
                        </div>
                      </div>
                    </li>
                    <MainMenu dataSource={menus} />
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <LoginModal visible={this.state.logInVisible} />
        </div>
      </div>
    );
  }
}

export default AppHeader;
