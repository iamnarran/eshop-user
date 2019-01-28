import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Badge, Avatar, Modal } from 'antd';

import Category from '../components/Category';
import MainMenu from '../components/Menu';
import DropMenu from '../components/DropMenu';
import ToggleMenu from '../components/ToggleMenu';
import ToggleCategory from '../components/ToggleCategory';


import config from '../config';

const IMAGE =
  process.env.NODE_ENV === 'development'
    ? config.image.development
    : config.image.production;

class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isLogin: false,
      isToggle: false,
      logInVisible: false,
      SingUpVisible: false,
      isSearch: false,
    }
  }

  toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });
  toggleSearch = () => this.setState({ isSearch: !this.state.isSearch });
  showLogInModal = () => this.setState({ logInVisible: true });
  handleLogInSave = () => this.setState({ logInVisible: false, })
  handleLogInCancel = () => this.setState({ logInVisible: false, });
  showSingUpModal = () => this.setState({ SingUpVisible: true });
  handleSingUpSave = () => this.setState({ SingUpVisible: false, });
  handleSingUpCancel = () => this.setState({ SingUpVisible: false, });

  togglePopup = () => { this.props.onChange() };

  render() {
    const { staticinfo } = this.props.container;
    const { menus } = this.props.container;
    const { categories } = this.props.container;

    const root = [];
    categories.forEach((entry) => {
      if (entry.parentid === 0) {
        entry.children = [];
        root.push(entry);
      }
      root.forEach((ent) => {
        if (ent.id === entry.parentid) {
          ent.children.push(entry);
        }
      });
    });

    const menuClass = `dropdown-menu${this.state.isOpen ? " show" : ""}`;
    const seartchClass = `search-mobile${this.state.isSearch ? " activated" : ""}`;
    const togglePopup = `${this.props.isToggle ? " activated" : ""}`;

    return (
      <div>
        <div className={togglePopup} >
          <div className="fixed-mobile-menu">
            <div className="single">
              <ul className="list-unstyled flex-this flex-space top-1">
                <li className="list-inline-item">
                  <Link to="" className="e-phone">
                    <i className="fa fa-phone" aria-hidden="true"></i>
                    <strong>{staticinfo.phone}</strong>
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link to="" className="e-help">
                    <span>Тусламж</span>
                  </Link>
                </li>
                <li className="list-inline-item language">
                  <form>
                    <select className="custom-select" defaultValue="0">
                      <option value="0">МОН</option>
                      <option value="1">ENG</option>
                    </select>
                  </form>
                </li>
              </ul>
              <ul className="list-unstyled flex-this flex-space top-2">
                <li className="list-inline-item notification">
                  <Link to="#">
                    <i className="fa fa-bell" aria-hidden="true"></i>
                    <span>5</span>
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link to="#" onClick={this.showLogInModal}>
                    <span className="text-uppercase">Нэвтрэх</span>
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link to="#" onClick={this.showSingUpModal}>
                    <span className="text-uppercase">Бүртгүүлэх</span>
                  </Link>
                </li>
              </ul>
            </div>
            <ToggleMenu dataSource={menus} />
            <ToggleCategory dataSource={root} />
          </div>

          <div className="wrap" >
            <div className="top-container">
              <div className="top-nav">
                <div className="container container-laptop pad10">
                  <div className="row row10">
                    <div className="col-lg-6 col-md-6 d-none d-md-block pad10">
                      <ul className="list-inline left-panel">
                        <li className="list-inline-item">
                          <Link to="#" className="e-phone">
                            <Icon type="phone" theme="filled" style={{ color: 'rgba(254, 180, 21, 1)', }} />
                            <strong> {staticinfo.phone} </strong>
                          </Link>
                        </li>
                        <li className="list-inline-item">
                          <Link to="" className="e-help">
                            <span>Тусламж</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="col-lg-6 col-md-6 d-none d-md-block  pad10">
                      <div className="text-right">
                        <ul className="list-inline right-panel">
                          <li className="list-inline-item language">
                            <form>
                              <select className="custom-select" defaultValue="0">
                                <option value='0' defaultValue>МОН</option>
                                <option value="1">ENG</option>
                              </select>
                            </form>
                          </li>
                          <li className="list-inline-item notification">
                            <Badge dot>
                              <Avatar shape="square" icon="bell" theme="filled" size="small" style={{ lineHeight: '20px' }} />
                            </Badge>
                          </li>
                          <li className="list-inline-item">
                            <Link to="#" onClick={this.showLogInModal}>
                              <span className="text-uppercase">Нэвтрэх</span>
                            </Link>
                          </li>
                          <li className="list-inline-item">
                            <Link to="" onClick={this.showSingUpModal}>
                              <span className="text-uppercase">Бүртгүүлэх</span>
                            </Link>
                          </li>
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
                        <Link to="" className="mobile-menu-btn d-block d-md-none" onClick={this.togglePopup} >
                          <i className="fa fa-navicon" aria-hidden="true"></i>
                          <i className="fa fa-times" aria-hidden="true"></i>
                        </Link>
                        <Link to={'http://localhost:3001'} className="logo">
                          <img alt="logo" src={IMAGE + staticinfo.logopath} />
                        </Link>
                        <div className="search">
                          <form className={seartchClass}>
                            <ul className="list-unstyled list-float clr">
                              <li>
                                <div className="dropdown" onClick={this.toggleOpen}>
                                  <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Бүх бараа
                                                            </button>
                                  <div className={menuClass} aria-labelledby="dropdownMenuButton">
                                    {
                                      root.map((entry, index) => {
                                        return (
                                          <Link className="dropdown-item" to="" key={index}>
                                            <img src={IMAGE + entry.icon} alt="category" />
                                            <span>{entry.name}</span>
                                          </Link>
                                        )
                                      })
                                    }
                                  </div>
                                </div>
                              </li>
                              <li className="search-form">
                                <div className="form-group">
                                  <label htmlFor="exampleInputEmail" className="sr-only">Main-search</label>
                                  <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Бүгдээс хайх" />
                                </div>
                              </li>
                              <li>
                                <button type="submit" className="btn">
                                  <i className="fa fa-search"></i>
                                  <span className="text-uppercase">Хайх</span>
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
                            <Link to="" className="flex-this search-mobile-btn d-flex d-lg-none" onClick={this.toggleSearch}>
                              <i className="fa fa-search"></i>
                              <p>
                                <small>Хайлт</small>
                                <span className="text-uppercase">хийх</span>
                              </p>
                            </Link>
                          </li>
                          <li className="list-inline-item">
                            <Link to="">
                              <Icon type="heart" theme="filled" />
                              <p>
                                <small>Хадгалсан</small>
                                <span className="text-uppercase">бараа</span>
                              </p>
                            </Link>
                          </li>
                          <li className="list-inline-item">
                            <Link to="">
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
                      <Link to=''>
                        <Icon type="home" theme="filled" style={{ color: '#feb415' }}></Icon>
                      </Link>
                    </li>
                    <li className="list-inline-item has-drop">
                      <Link to="">
                        <span>Ангилал</span>
                        <Icon type="down" style={{ color: '#feb415' }} />
                      </Link>

                      <div className="drop-container">
                        <div className="container pad10">
                          <DropMenu dataSource={menus} />
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
          <Modal
            title="Нэвтрэх"
            visible={this.state.logInVisible}
            onOk={this.handleLogInSave}
            onCancel={this.handleLogInCancel}
            footer={[]}
          >
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1" className="sr-only">Email address</label>
                  <input type="email" className="form-control" id="exampleInputEmail9" aria-describedby="emailHelp" placeholder="Имэйл хаяг" />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1" className="sr-only">Password</label>
                  <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Нууц үг" />
                </div>
                <div className="form-group">
                  <div className="row row10">
                    <div className="col-xl-6 pad10">
                      <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Сануулах</label>
                      </div>
                    </div>
                    <div className="col-xl-6 pad10">
                      <div className="text-right">
                        <Link to="#" className="btn btn-link">Нууц үгээ мартсан</Link>
                      </div>
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-block btn-login text-uppercase">Нэвтрэх</button>
              </form>
              <span className="divide-maker">Эсвэл</span>
              <button type="submit" className="btn btn-block btn-social btn-facebook">
                <span>Facebook-р бүртгүүлэх</span></button>
              <button type="submit" className="btn btn-block btn-social btn-gmail">Gmail-р бүртгүүлэх</button>
              <button type="submit" className="btn btn-block btn-social btn-emart">Имарт картаар бүртгүүлэх</button>
              <div className="text-center">
                <Link to="#" className="btn btn-link">Та шинээр бүртгүүлэх бол ЭНД ДАРЖ бүртгүүлнэ үү</Link>
              </div>
            </div>
          </Modal>

          <Modal
            title="Бүртгүүлэх"
            visible={this.state.SingUpVisible}
            onOk={this.handleSingUpSave}
            onCancel={this.handleSingUpCancel}
            footer={[]}
          >
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1" className="sr-only">Email address</label>
                  <input type="email" className="form-control" id="exampleInputEmail3" aria-describedby="emailHelp" placeholder="Овог" />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1" className="sr-only">Password</label>
                  <input type="password" className="form-control" id="exampleInputPassword4" placeholder="Нэр" />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1" className="sr-only">Email address</label>
                  <input type="email" className="form-control" id="exampleInputEmail5" aria-describedby="emailHelp" placeholder="Имэйл хаяг" />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1" className="sr-only">Password</label>
                  <input type="password" className="form-control" id="exampleInputPassword6" placeholder="Утасны дугаар" />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1" className="sr-only">Email address</label>
                  <input type="email" className="form-control" id="exampleInputEmail7" aria-describedby="emailHelp" placeholder="Нууц үг" />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1" className="sr-only">Password</label>
                  <input type="password" className="form-control" id="exampleInputPassword8" placeholder="Нууц үг давтах" />
                </div>
                <button type="submit" className="btn btn-block btn-login text-uppercase">Бүртгүүлэх</button>
              </form>
              <span className="divide-maker">Эсвэл</span>
              <button type="submit" className="btn btn-block btn-social btn-facebook">
                <span>Facebook-р бүртгүүлэх</span></button>
              <button type="submit" className="btn btn-block btn-social btn-gmail">Gmail-р бүртгүүлэх</button>
              <button type="submit" className="btn btn-block btn-social btn-emart">Имарт картаар бүртгүүлэх</button>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}
export default AppHeader;