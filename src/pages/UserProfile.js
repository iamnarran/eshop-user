import React from "react";
import proimg from "../scss/assets/images/demo/1.jpg";
import { Route, Link, Switch, BrowserRouter } from "react-router-dom";
import {
  UserProfile,
  DeliveryAddress,
  ChangePass,
  History,
  WishList
} from "../components";

class Component extends React.Component {
  state = {
    cityOrProvince: [],
    districtOrSum: []
  };

  componentDidMount() {
    this.setState({ ...this.props.container });
  }
  render() {
    const { match } = this.props;
    const { districtOrSum, cityOrProvince } = this.state;
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
                              Болд
                              <br />
                              Ганзориг
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
                            <Link to={`${match.path}`} className="flex-this">
                              <i className="fa fa-user" aria-hidden="true" />
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
                              />
                              <span>Таны үзсэн барааны түүх</span>
                            </Link>
                          </li>
                          {/* <li>
                              <a href="/" className="flex-this">
                                <i className="fa fa-history" aria-hidden="true"></i>
                                <span>Худалдан авалтын түүх</span>
                              </a>
                            </li> */}
                          <li>
                            <Link
                              to={`${match.path}/wishlist`}
                              className="flex-this"
                            >
                              <i className="fa fa-heart" aria-hidden="true" />
                              <span>Хадгалсан бараа</span>
                            </Link>
                          </li>
                          {/* <li>
                              <a href="/" className="flex-this">
                                <i className="fa fa-bell" aria-hidden="true"></i>
                                <span>Мэдэгдэл</span>
                              </a>
                            </li> */}
                          {/* <li>
                              <a href="/" className="flex-this">
                                <i className="fa fa-database" aria-hidden="true"></i>
                                <span>Купон</span>
                              </a>
                            </li> */}
                          {/* <li>
                              <a href="/" className="flex-this">
                                <i className="fa fa-credit-card" aria-hidden="true"></i>
                                <span>ePoint карт</span>
                              </a>
                            </li> */}
                          <li>
                            <Link
                              to={`${match.path}/delivery`}
                              className="flex-this"
                            >
                              <i className="fa fa-compass" aria-hidden="true" />
                              <span>Хүргэлтийн хаяг</span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={`${match.path}/password`}
                              className="flex-this"
                            >
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
