import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import withCart from "./HOC/withCart";
import { updateCart } from "../actions/cart";
import { signOut, showLoginModal } from "../actions/login";
import { Progress } from "antd";
import p1 from "../scss/assets/images/demo/1.jpg";
import api from "../api";

class UserButton extends React.Component {
  state = {
    progress: ""
  };

  componentDidMount() {
    this.getUserData();
    this.setState({ ...this.props.container });
  }

  handleLoginClick = e => {
    e.preventDefault();
    this.props.showLoginModal();
  };

  handleLogoutClick = () => {
    this.props.updateCart({
      products: [],
      totalQty: 0,
      totalPrice: 0
    });
    this.props.signOut();
  };

  getUserData = async () => {
    let progress = 25;
    await api.customer.findUserData({ id: this.props.user.id }).then(res => {
      if (res.success) {
        if (res.data.info.imgnm) {
          progress = parseInt(progress) + 25;
        }
        if (res.data.addrs.length > 0) {
          progress = parseInt(progress) + 25;
        }
        if (res.data.card) {
          progress = parseInt(progress) + 25;
        }
        this.setState({ progress: progress });
      }
    });
  };
  render() {
    let content = (
      <li className="list-inline-item">
        <Link to="" onClick={this.handleLoginClick}>
          <span className="text-uppercase">Нэвтрэх</span>
        </Link>
      </li>
    );

    if (this.props.isLoggedIn && this.props.user) {
      let user = this.props.user;

      content = (
        <li className="list-inline-item user">
          <Link to="" className="flex-this">
            <div className="image-container default">
              <span
                className="image"
                style={{
                  backgroundImage: `url(${
                    user.picture
                      ? user.picture.data
                        ? user.picture.data.url
                        : user.picture
                      : p1
                  })`
                }}
              />
            </div>
            <span className="">
              {user.firstname
                ? user.lastname
                  ? `${user.firstname} ${user.lastname}`
                  : user.firstname
                : user.email
                ? user.email
                : ""}
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
                            user.picture
                              ? user.picture.data
                                ? user.picture.data.url
                                : user.picture
                              : p1
                          })`
                        }}
                      />
                    </div>
                    <p className="name">
                      {user.firstname
                        ? user.lastname
                          ? `${user.firstname} ${user.lastname}`
                          : user.firstname
                        : user.email
                        ? user.email
                        : ""}
                    </p>
                  </div>
                  <Progress
                    percent={parseInt(this.state.progress)}
                    strokeColor="#feb415"
                    showInfo={false}
                  />
                  <p className="text text-center">
                    <strong>Таны мэдээлэл</strong>
                    <span>{parseInt(this.state.progress)}%</span>
                  </p>
                </div>
                <ul className="list-unstyled">
                  <li /* className="active" */>
                    <Link to="/userprofile" className="flex-this">
                      <i
                        className="fa fa-user"
                        aria-hidden="true"
                        style={{ color: "#feb415" }}
                      />
                      <span>Профайл хуудас</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/userprofile" className="flex-this">
                      <i
                        className="fa fa-check-square"
                        aria-hidden="true"
                        style={{ color: "#feb415" }}
                      />
                      <span>Таны үзсэн барааны түүх</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/userprofile" className="flex-this">
                      <i
                        className="fa fa-history"
                        aria-hidden="true"
                        style={{ color: "#feb415" }}
                      />
                      <span>Захиалгын түүх</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/userprofile" className="flex-this">
                      <i
                        className="fa fa-heart"
                        aria-hidden="true"
                        style={{ color: "#feb415" }}
                      />
                      <span>Хадгалсан бараа</span>
                    </Link>
                  </li>
                  {/* <li>
                    <Link to="/userprofile" className="flex-this">
                      <i
                        className="fa fa-credit-card"
                        aria-hidden="true"
                        style={{ color: "#feb415" }}
                      />
                      <span>ePoint карт</span>
                    </Link>
                  </li> */}
                  <li>
                    <Link to="/userprofile" className="flex-this">
                      <i
                        className="fa fa-compass"
                        aria-hidden="true"
                        style={{ color: "#feb415" }}
                      />
                      <span>Хүргэлтийн хаяг</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/userprofile" className="flex-this">
                      <i
                        className="fa fa-lock"
                        aria-hidden="true"
                        style={{ color: "#feb415" }}
                      />
                      <span>Нууц үгээ солих</span>
                    </Link>
                  </li>
                </ul>
                <div className="text-left" onClick={this.handleLogoutClick}>
                  <button className="btn btn-gray">
                    <i className="fa fa-chevron-left" aria-hidden="true" />
                    <span className="text-uppercase">Гарах</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </li>
      );
    }

    return content;
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user
  };
};

export default withCart(
  connect(
    mapStateToProps,
    { updateCart, signOut, showLoginModal }
  )(UserButton)
);
