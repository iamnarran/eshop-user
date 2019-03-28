import React from "react";
import proimg from "../scss/assets/images/demo/1.jpg";
import { Route, Link, Switch, BrowserRouter } from "react-router-dom";
import {
  UserProfile,
  History,
  WishList,
  DeliveryAddress,
  ChangePass
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
    console.log(this.props);
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
                            <Link to={`/userprofile`} className="flex-this">
                              <i className="fa fa-user" aria-hidden="true" />
                              <span>Профайл хуудас</span>
                            </Link>
                          </li>
                          <li>
                            <Link to={`/history`} className="flex-this">
                              <i
                                className="fa fa-check-square"
                                aria-hidden="true"
                              />
                              <span>Таны үзсэн барааны түүх</span>
                            </Link>
                          </li>
                          <li>
                            <Link to={`/wishlist`} className="flex-this">
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
                      <Route
                        exact
                        path={`/userprofile`}
                        component={UserProfile}
                      />
                      <Route exact path={`/history`} component={History} />
                      <Route exact path={`/wishlist`} component={WishList} />
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
