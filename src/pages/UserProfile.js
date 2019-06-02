/* import React from "react";
import proimg from "../scss/assets/images/demo/1.jpg";
import { Route, Link, Switch, BrowserRouter } from "react-router-dom";
import {
  UserProfile,
  History,
  WishList,
  DeliveryAddress,
  ChangePass,
  DeliveryHistory
} from "../components";
import api from "../api";

class Component extends React.Component {
  state = {
    cityOrProvince: [],
    districtOrSum: [],
    wishlist: []
  };

  componentDidMount() {
    this.setState({ ...this.props.container });
    api.wishList.findAlls({ custId: "14" }).then(res => {
      if (res.success) {
        this.setState({
          wishlist: res.data
        });
      }
      this.setState({ loading: false });
    });
  }

  render() {
    const location = this.props.match.url;
    return (
      <div className="section section-gray">
        <BrowserRouter>
          <div>
            <div className="container pad10">
              <div className="user-section">
                <div className="btn btn-gray">
                  <Link to="/">
                    <span className="text-uppercase">Нүүр хуудас</span>
                  </Link>
                </div>
                <div className="user-section-container">
                  <div className="row row10">
                    <div className="col-md-4 d-none d-md-block pad10">
                      <div className="profile-menu">
                        <div className="menu-header">
                          <div className="flex-this">
                            <div className="image-container default">
                              <span
                                className="image"
                                style={{ backgroundImage: `url(${proimg})` }}
                              />
                            </div>
                            <p className="name">
                              Tulgaa
                              <br />
                              datacare
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
                          <li className="">
                            <Link to={location} className="flex-this">
                              <i className="fa fa-user" aria-hidden="true" />
                              <span>Профайл хуудас</span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={location + `/history`}
                              className="flex-this"
                            >
                              <i
                                className="fa fa-check-square"
                                aria-hidden="true"
                              />
                              <span>Таны үзсэн барааны түүх</span>
                            </Link>
                          </li>
                          <li>
                            <Link to={`/deliveryHistory`} className="flex-this">
                              <i className="fa fa-history" aria-hidden="true" />
                              <span>Худалдан авалтын түүх</span>
                            </Link>
                          </li>
                          <li>
                            <Link to={`/wishlist`} className="flex-this">
                              <i className="fa fa-heart" aria-hidden="true" />
                              <span>Хадгалсан бараа</span>
                            </Link>
                          </li>
                          <li>
                            <Link to={`/deliveryAddress`} className="flex-this">
                              <i className="fa fa-compass" aria-hidden="true" />
                              <span>Хүргэлтийн хаяг</span>
                            </Link>
                          </li>
                          <li>
                            <Link to={`/changePass`} className="flex-this">
                              <i className="fa fa-lock" aria-hidden="true" />
                              <span>Нууц үгээ солих</span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <a href="/" className="btn btn-gray">
                        <i className="fa fa-chevron-left" aria-hidden="true" />
                        <span className="text-uppercase">Гарах</span>
                      </a>
                    </div>
                    <Switch>
                      <Route exact path={location} component={UserProfile} />
                      <Route
                        exact
                        path={location + `/history`}
                        component={History}
                      />
                      <Route exact path={`/wishlist`} component={WishList} />
                      <Route
                        exact
                        path={`/deliveryHistory`}
                        component={DeliveryHistory}
                      />
                      <Route
                        exact
                        path={`/deliveryAddress`}
                        component={DeliveryAddress}
                      />
                      <Route
                        exact
                        path={`/changePass`}
                        component={ChangePass}
                      />
                    </Switch>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
export default Component;
 */

import React from "react";
import { connect } from "react-redux";
import { Route, Link, Switch, BrowserRouter as Router } from "react-router-dom";
import { Upload, Button, Icon, message, Progress, Avatar } from "antd";
import {
  UserProfile,
  DeliveryAddress,
  ChangePass,
  History,
  WishList,
  DeliveryHistory,
  Epoint
} from "../components";
import api from "../api";
import avatar from "../scss/assets/images/demo/defaultAvatar.png";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === "image/jpeg";
  if (!isJPG) {
    message.error("You can only upload JPG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJPG && isLt2M;
}

class UserProfilePage extends React.Component {
  state = {
    cityOrProvince: [],
    districtOrSum: [],
    active: "userprofile",
    progress: ""
  };

  componentDidMount() {
    this.getUserData();
    this.setState({ ...this.props.container });
  }

  toggleMenu = () => {
    this.setState({ isToggle: !this.state.isToggle });
  };

  getUserData = async () => {
    let progress = 25;
    await api.customer.findUserData({ id: this.props.user.id }).then(res => {
      if (res.success) {
        console.log(res.data);

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

  renderProfileInfo = () => {
    if (this.props.isLoggedIn && this.props.user) {
      const { match, user } = this.props;
      
      return (
        <div className="section section-gray">
          <Router>
            <div>
              <div className="container pad10">
                <div className="user-section">
                  <div className="user-section-container">
                    <div className="row row10">
                      <div className="col-md-4 d-none d-md-block pad10">
                        <div className="profile-menu">
                          <div className="menu-header">
                            <div className="flex-this">
                              <Avatar size={64} src={avatar} />
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
                            <p className="text text-right">
                              <strong>Таны мэдээлэл</strong>
                              <Progress
                                percent={parseInt(this.state.progress)}
                                strokeColor="#feb415"
                              />
                            </p>
                            <div />
                          </div>
                          <ul className="list-unstyled">
                            <li className="">
                              <Link to={`${match.path}`} className="flex-this">
                                <i
                                  className="fa fa-user"
                                  aria-hidden="true"
                                  style={{ color: "#feb415" }}
                                />
                                <span>Профайл хуудас</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`${match.path}/history`}
                                className="flex-this"
                              >
                                <i
                                  className="fa fa-check-square"
                                  aria-hidden="true"
                                  style={{ color: "#feb415" }}
                                />
                                <span>Таны үзсэн барааны түүх</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`${match.path}/wishlist`}
                                className="flex-this"
                              >
                                <i
                                  className="fa fa-heart"
                                  aria-hidden="true"
                                  style={{ color: "#feb415" }}
                                />
                                <span>Хадгалсан бараа</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`${match.path}/deliveryhistory`}
                                className="flex-this"
                              >
                                <i
                                  className="fa fa-heart"
                                  aria-hidden="true"
                                  style={{ color: "#feb415" }}
                                />
                                <span>Захиалгын түүх</span>
                              </Link>
                            </li>
                            {/* <li>
                              <Link
                                to={`${match.path}/epoint`}
                                className="flex-this"
                              >
                                <i
                                  className="fa fa-credit-card"
                                  aria-hidden="true"
                                  style={{ color: "#feb415" }}
                                />
                                <span>ePoint карт</span>
                              </Link>
                            </li> */}
                            <li>
                              <Link
                                to={`${match.path}/delivery`}
                                className="flex-this"
                              >
                                <i
                                  className="fa fa-compass"
                                  aria-hidden="true"
                                  style={{ color: "#feb415" }}
                                />
                                <span>Хүргэлтийн хаяг</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`${match.path}/password`}
                                className="flex-this"
                              >
                                <i
                                  className="fa fa-lock"
                                  aria-hidden="true"
                                  style={{ color: "#feb415" }}
                                />
                                <span>Нууц үгээ солих</span>
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <a href="/" className="btn btn-gray">
                          <i
                            className="fa fa-chevron-left"
                            aria-hidden="true"
                          />
                          <span className="text-uppercase">Гарах</span>
                        </a>
                      </div>

                      <Switch>
                        <Route
                          exact
                          path={`${match.url}`}
                          component={UserProfile}
                        />
                        <Route
                          exact
                          path={`${match.url}/delivery`}
                          component={DeliveryAddress}
                        />
                        <Route
                          exact
                          path={`${match.url}/password`}
                          component={ChangePass}
                        />
                        <Route
                          exact
                          path={`${match.url}/history`}
                          component={History}
                        />
                        <Route
                          exact
                          path={`${match.url}/wishlist`}
                          component={WishList}
                        />
                        <Route
                          exact
                          path={`${match.url}/deliveryhistory`}
                          component={DeliveryHistory}
                        />
                        <Route
                          exact
                          path={`${match.url}/epoint`}
                          component={Epoint}
                        />
                      </Switch>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Router>
        </div>
      );
    }

    return <div>Нэвтрээгүй байна</div>;
  };

  render() {
    return this.renderProfileInfo();
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(UserProfilePage);
