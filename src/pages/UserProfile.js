import React from "react";
import { post } from "axios";
import { connect } from "react-redux";
import { Route, Link, Switch, BrowserRouter as Router } from "react-router-dom";
import { Upload, message, Progress, Avatar } from "antd";
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
import { signOut } from "../actions/login";
import avatar from "../scss/assets/images/demo/defaultAvatar.png";
import profile from "../scss/assets/images/demo/profile.png";
import history from "../scss/assets/images/demo/history.png";
import wishlist from "../scss/assets/images/demo/wishlist.png";
import location from "../scss/assets/images/demo/location.png";
import password from "../scss/assets/images/demo/password.png";
import store from "../scss/assets/images/demo/store.png";
import appViewsApi from "../api/appViewsApi";
import { IMAGE } from "../utils/consts";
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
    progress: "",
    id: "14",
    file: null,
    file: "",
    userImage: null
  };

  componentDidMount() {
    this.getUserData();
    this.setState({ ...this.props.container });
  }

  toggleMenu = () => {
    this.setState({ isToggle: !this.state.isToggle });
  };

  setFile(e) {
    this.setState({ file: e.target.files[0] });
  }

  getUserData = async () => {
    let progress = 25;
    await api.customer.findUserData({ id: this.props.user.id }).then(res => {
      if (res.success) {
        if (res.data.info.imgnm) {
          this.setState({ userImage: res.data.info.imgnm });
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

  handleLogoutClick = () => {
    this.props.signOut();
  };

  _handleImageChange(img) {
    console.log("zurag", img);
    var data = new FormData();
    if (img && img[0]) {
      let reader = new FileReader();
      reader.onload = event => {
        this.setState({
          file: img
        });
      };
      reader.readAsDataURL(img[0]);
    }
  }

  handleChange = ({ fileList }) => {
    var data = new FormData();
    data.append("uploadimage", fileList[0].originFileObj);
    data.append("custid", this.props.user.id);
    api.customer
      .uploadImage(data)
      .then(res => {
        console.log(res);
        if (res.success == true) {
          console.log(res);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  renderProfileInfo = () => {
    if (this.props.isLoggedIn && this.props.user) {
      const { match, user } = this.props;
      console.log("user", user);
      match.path = "/userprofile";
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
                            <Upload
                              className="avatar-uploader"
                              showUploadList={false}
                              beforeUpload={beforeUpload}
                              onChange={this.handleChange}
                            >
                              <div className="flex-this">
                                {this.state.userImage ? (
                                  <Avatar
                                    size="large"
                                    src={IMAGE + this.state.userImage}
                                  />
                                ) : (
                                  <Avatar size="large" src={avatar} />
                                )}
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
                            </Upload>
                            <p className="text text-right">
                              Таны мэдээлэл
                              <Progress
                                percent={parseInt(this.state.progress)}
                                strokeColor="#feb415"
                              />
                            </p>
                          </div>
                          <ul className="list-unstyled">
                            <li className="">
                              <Link
                                to={`${match.path}`}
                                className="flex-this"
                                style={{ textDecoration: "none" }}
                              >
                                <Avatar
                                  size="small"
                                  shape="square"
                                  src={profile}
                                  className="marginRight10"
                                />{" "}
                                <span>Профайл хуудас</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`${match.path}/history`}
                                className="flex-this"
                              >
                                <Avatar
                                  size="small"
                                  shape="square"
                                  src={history}
                                  className="marginRight10"
                                />{" "}
                                <span>Таны үзсэн барааны түүх</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`${match.path}/wishlist`}
                                className="flex-this"
                              >
                                <Avatar
                                  size="small"
                                  shape="square"
                                  src={wishlist}
                                  className="marginRight10"
                                />{" "}
                                <span>Хадгалсан бараа</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`${match.path}/deliveryhistory`}
                                className="flex-this"
                              >
                                <Avatar
                                  size="small"
                                  shape="square"
                                  src={store}
                                  className="marginRight10"
                                />{" "}
                                <span>Захиалгын түүх</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`${match.path}/delivery`}
                                className="flex-this"
                              >
                                <Avatar
                                  size="small"
                                  shape="square"
                                  src={location}
                                  className="marginRight10"
                                />{" "}
                                <span>Хүргэлтийн хаяг</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`${match.path}/password`}
                                className="flex-this"
                              >
                                <Avatar
                                  size="small"
                                  shape="square"
                                  src={password}
                                  className="marginRight10"
                                />{" "}
                                <span>Нууц үгээ солих</span>
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <Link
                          to="/"
                          className="btn btn-gray"
                          onClick={this.handleLogoutClick}
                        >
                          <i
                            className="fa fa-chevron-left"
                            aria-hidden="true"
                          />
                          <span className="text-uppercase">Гарах</span>
                        </Link>
                      </div>

                      <Switch>
                        <Route
                          exact
                          path={`${match.path}`}
                          component={UserProfile}
                        />
                        <Route
                          exact
                          path={`${match.path}/delivery`}
                          component={DeliveryAddress}
                        />
                        <Route
                          exact
                          path={`${match.path}/password`}
                          component={ChangePass}
                        />
                        <Route
                          exact
                          path={`${match.path}/history`}
                          component={History}
                        />
                        <Route
                          exact
                          path={`${match.path}/wishlist`}
                          component={WishList}
                        />
                        <Route
                          exact
                          path={`${match.path}/deliveryhistory`}
                          component={DeliveryHistory}
                        />
                        <Route
                          exact
                          path={`${match.path}/epoint`}
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

export default connect(
  mapStateToProps,
  { signOut }
)(UserProfilePage);
