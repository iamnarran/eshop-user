import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import storage from "../utils/storage";
import { signOut } from "../actions/Login";

class UserButton extends React.Component {
  showLoginModal = e => {
    e.preventDefault();
    this.props.onUserButtonClick(e);
  };

  handleLogout = e => {
    e.preventDefault();
    this.props.signOut();
    window.location.reload();
  };

  render() {
    let content = (
      <li className="list-inline-item">
        <Link to="" onClick={this.showLoginModal}>
          <span className="text-uppercase">Нэвтрэх</span>
        </Link>
      </li>
    );

    if (storage.get("user")) {
      let user = storage.get("user");

      if (user.customerInfo) {
        user = user.customerInfo;
      }

      content = (
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
    }

    return content;
  }
}

export default connect(
  null,
  { signOut }
)(UserButton);
