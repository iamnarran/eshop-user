import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { signOut } from "../actions/login";
import p1 from "../scss/assets/images/demo/1.jpg";

class UserButton extends React.Component {
  showLoginModal = e => {
    e.preventDefault();
    this.props.onUserButtonClick(e);
  };

  handleLogout = () => {
    this.props.signOut();
  };

  render() {
    let content = (
      <li className="list-inline-item">
        <Link to="" onClick={this.showLoginModal}>
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
                    <Link to="/userprofile" className="flex-this">
                      <i className="fa fa-check-square" aria-hidden="true" />
                      <span>Таны үзсэн барааны түүх</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/userprofile" className="flex-this">
                      <i className="fa fa-history" aria-hidden="true" />
                      <span>Худалдан авалтын түүх</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/userprofile" className="flex-this">
                      <i className="fa fa-heart" aria-hidden="true" />
                      <span>Хадгалсан бараа</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="" className="flex-this">
                      <i className="fa fa-credit-card" aria-hidden="true" />
                      <span>ePoint карт</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/userprofile/deliveryAddress"
                      className="flex-this"
                    >
                      <i className="fa fa-compass" aria-hidden="true" />
                      <span>Хүргэлтийн хаяг</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/userprofile" className="flex-this">
                      <i className="fa fa-lock" aria-hidden="true" />
                      <span>Нууц үгээ солих</span>
                    </Link>
                  </li>
                </ul>
                <div className="text-left" onClick={this.handleLogout}>
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

export default connect(
  mapStateToProps,
  { signOut }
)(UserButton);
