import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Badge, Avatar } from 'antd';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import Category from '../components/Category';
import MainMenu from '../components/Menu';
import Slider from '../components/Swiper';
import config from '../config';
import timesale1 from '../scss/assets/images/demo/6.jpg';
import timesale2 from '../scss/assets/images/demo/7.jpg';
import timesale3 from '../scss/assets/images/demo/8.jpg';
import timesale4 from '../scss/assets/images/demo/9.jpg';
import timesale5 from '../scss/assets/images/demo/5.jpg';
import timesale6 from '../scss/assets/images/demo/11.jpg';
import timesale7 from '../scss/assets/images/demo/12.jpg';
import ehow1 from '../scss/assets/images/demo/13.jpg';
import ehow2 from '../scss/assets/images/demo/14.jpg';
import ehow3 from '../scss/assets/images/demo/15.jpg';
import ehow4 from '../scss/assets/images/demo/16.jpg';
import ehow5 from '../scss/assets/images/demo/17.jpg';


const IMAGE =
    process.env.NODE_ENV === 'development'
        ? config.image.development
        : config.image.production;

class Dashboard extends Component {

    state = {
        isOpen: false,
    };

    toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

    handleChange(value) {
        console.log(`selected ${value}`);
    }

    render() {

        const { staticinfo } = this.props.container;
        const { categories } = this.props.container;
        const { banner } = this.props.container;
        const { brands } = this.props.container;
        const { menus } = this.props.container;

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

        const homeBannerParams = {
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true
            },
            spaceBetween: 0
        }

        const brandsParams = {
            slidesPerView: 5,
            spaceBetween: 10,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            pagination: {
                type: 'bullets',
                clickable: true
            },
        }

        const menuClass = `dropdown-menu${this.state.isOpen ? " show" : ""}`;

        return (
            <div className="top-container" >

                <div className="top-nav">
                    <div className="container container-laptop pad10">
                        <div className="row row10">
                            <div className="col-xl-6 pad10">
                                <ul className="list-inline left-panel">
                                    <li className="list-inline-item">
                                        <a href="" className="e-phone">
                                            <Icon type="phone" theme="filled" style={{ color: 'rgba(254, 180, 21, 1)', }} />
                                            <strong> {staticinfo.phone} </strong>
                                        </a>
                                    </li>
                                    {/* <li className="list-inline-item">
                                        <Link to="" className="e-help">
                                            <span>Тусламж</span>
                                        </Link>
                                    </li> */}
                                </ul>
                            </div>
                            <div className="col-xl-6 pad10">
                                <div className="text-right">
                                    <ul className="list-inline right-panel">
                                        <li className="list-inline-item language">
                                            <form>
                                                <select className="custom-select" defaultValue="0">
                                                    <option value='0' defaultValue>МОН</option>
                                                    <option value="1">ENG</option>
                                                    {/* <option value="2">KOR</option> */}
                                                </select>
                                            </form>
                                        </li>
                                        <li className="list-inline-item">
                                            <Badge dot>
                                                <Avatar shape="square" icon="bell" theme="filled" size="small" style={{ lineHeight: '20px' }} />
                                            </Badge>
                                        </li>
                                        <li className="list-inline-item">
                                            <Link to="" role="button" data-toggle="modal" data-target="#exampleModal1">
                                                <span className="text-uppercase">Нэвтрэх</span>
                                            </Link>
                                        </li>
                                        <li className="list-inline-item">
                                            <Link to="" role="button" data-toggle="modal" data-target="#exampleModal2">
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
                            <div className="col-xl-8 pad10">
                                <div className="flex-this">
                                    <Link to={'http://localhost:3001'} className="logo">
                                        <img alt="logo" src={IMAGE + staticinfo.logopath} />
                                    </Link>
                                    <div className="search">
                                        <form>
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
                                                <li>
                                                    <div className="form-group">
                                                        <label htmlFor="mainsearch" className="sr-only">Main-search</label>
                                                        <input type="text" className="form-control" id="mainsearch" aria-describedby="emailHelp" placeholder="Бүгдээс хайх" />
                                                    </div>
                                                </li>
                                                <li>
                                                    <button type="submit" className="btn">
                                                        <i className="fa fa-search" aria-hidden="true"></i>
                                                        <span className="text-uppercase">Хайх</span>
                                                    </button>
                                                </li>
                                            </ul>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="offset-xl-1 col-xl-3 pad10">
                                <div className="action">
                                    <ul className="list-inline">
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
                                <Link to="">
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
                                        <Category dataSource={root} />
                                    </div>
                                </div>
                            </li>
                            <MainMenu dataSource={menus} />
                        </ul>
                    </div>
                </div>

                {/* Slider */}
                <div className="main-slide">
                    <Slider dataSource={banner} params={homeBannerParams} elContainer={'banner'} />
                </div>
                {/* Slider end */}

                {/* Recently Products */}
                <div className="section">
                    <div className="container pad10">
                        <h1 className="title">
                            <span className="text-uppercase">Эрэлт ихтэй бүтээгдэхүүн</span>
                        </h1>
                        <div className="row row10">
                            <div className="col-xl-4 pad10">
                                <div className="single-product big-product sale-product timed-product">
                                    <div className="image-container">
                                        <Link to="">
                                            <span className="image" style={{ backgroundImage: `url(${timesale5})` }}></span>
                                        </Link>
                                        <div className="percent">
                                            <span className="text"><strong>10</strong><small>%</small></span>
                                        </div>
                                        <div className="time">
                                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                                            <span className="text">21 : 32 : 46</span>
                                        </div>
                                    </div>
                                    <div className="info-container">
                                        <Link to="" className="name">
                                            <span>Шингэн кофе Американо No Brand</span>
                                        </Link>
                                        <Link to="" className="cat">
                                            <span>Лаазтай кофе латте</span>
                                        </Link>
                                        <Link to="" className="rating">
                                            <ul className="list-inline">
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item half-active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <span className="text">197</span>
                                                </li>
                                            </ul>
                                        </Link>
                                        <Link to="" className="price">
                                            <small className="sale">6,900₮</small>
                                            <span className="current">6,500₮</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 pad10">
                                <div className="single-product big-product">
                                    <div className="image-container">
                                        <Link to="">
                                            <span className="image" style={{ backgroundImage: `url(${timesale5})` }}></span>
                                        </Link>
                                        <div className="percent">
                                            <span className="text"><strong>10</strong><small>%</small></span>
                                        </div>
                                        <div className="time">
                                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                                            <span className="text">21 : 32 : 46</span>
                                        </div>
                                    </div>
                                    <div className="info-container">
                                        <Link to="" className="name">
                                            <span>Шингэн кофе Американо No Brand</span>
                                        </Link>
                                        <Link to="" className="cat">
                                            <span>Лаазтай кофе латте</span>
                                        </Link>
                                        <Link to="" className="rating">
                                            <ul className="list-inline">
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item half-active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <span className="text">197</span>
                                                </li>
                                            </ul>
                                        </Link>
                                        <Link to="" className="price">
                                            <small className="sale">6,900₮</small>
                                            <span className="current">6,500₮</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 pad10">
                                <div className="single-product big-product">
                                    <div className="image-container">
                                        <Link to="">
                                            <span className="image" style={{ backgroundImage: `url(${timesale5})` }}></span>
                                        </Link>
                                        <div className="percent">
                                            <span className="text"><strong>10</strong><small>%</small></span>
                                        </div>
                                        <div className="time">
                                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                                            <span className="text">21 : 32 : 46</span>
                                        </div>
                                    </div>
                                    <div className="info-container">
                                        <Link to="" className="name">
                                            <span>Шингэн кофе Американо No Brand</span>
                                        </Link>
                                        <Link to="" className="cat">
                                            <span>Лаазтай кофе латте</span>
                                        </Link>
                                        <Link to="" className="rating">
                                            <ul className="list-inline">
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item half-active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <span className="text">197</span>
                                                </li>
                                            </ul>
                                        </Link>
                                        <Link to="" className="price">
                                            <small className="sale">6,900₮</small>
                                            <span className="current">6,500₮</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row row10">
                            <div className="col-five pad10">
                                <div className="single-product small-product">
                                    <div className="image-container">
                                        <Link to="">
                                            <span className="image" style={{ backgroundImage: `url(${timesale5})` }}></span>
                                        </Link>
                                        <div className="percent">
                                            <span className="text"><strong>10</strong><small>%</small></span>
                                        </div>
                                        <div className="time">
                                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                                            <span className="text">21 : 32 : 46</span>
                                        </div>
                                    </div>
                                    <div className="info-container">
                                        <Link to="" className="name">
                                            <span>Хуурай кофе Американо No Brand</span>
                                        </Link>
                                        <Link to="" className="cat">
                                            <span>Лаазтай кофе латте Лаазтай кофе латте</span>
                                        </Link>
                                        <Link to="" className="rating">
                                            <ul className="list-inline">
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item half-active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <span className="text">197</span>
                                                </li>
                                            </ul>
                                        </Link>
                                        <Link to="" className="price">
                                            <small className="sale">6,900₮</small>
                                            <span className="current">6,500₮</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-five pad10">
                                <div className="single-product small-product">
                                    <div className="image-container">
                                        <Link to="">
                                            <span className="image" style={{ backgroundImage: `url(${timesale5})` }}></span>
                                        </Link>
                                        <div className="percent">
                                            <span className="text"><strong>10</strong><small>%</small></span>
                                        </div>
                                        <div className="time">
                                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                                            <span className="text">21 : 32 : 46</span>
                                        </div>
                                    </div>
                                    <div className="info-container">
                                        <Link to="" className="name">
                                            <span>Шингэн кофе Американо No Brand</span>
                                        </Link>
                                        <Link to="" className="cat">
                                            <span>Лаазтай кофе латте урт нэр</span>
                                        </Link>
                                        <Link to="" className="rating">
                                            <ul className="list-inline">
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item half-active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <span className="text">197</span>
                                                </li>
                                            </ul>
                                        </Link>
                                        <Link to="" className="price">
                                            <small className="sale">6,900₮</small>
                                            <span className="current">6,500₮</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-five pad10">
                                <div className="single-product small-product sale-product timed-product">
                                    <div className="image-container">
                                        <Link to="">
                                            <span className="image" style={{ backgroundImage: `url(${timesale5})` }}></span>
                                        </Link>
                                        <div className="percent">
                                            <span className="text"><strong>10</strong><small>%</small></span>
                                        </div>
                                        <div className="time">
                                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                                            <span className="text">21 : 32 : 46</span>
                                        </div>
                                    </div>
                                    <div className="info-container">
                                        <Link to="" className="name">
                                            <span>Шингэн кофе Американо</span>
                                        </Link>
                                        <Link to="" className="cat">
                                            <span>Лаазтай кофе латте шинэ хувилбар</span>
                                        </Link>
                                        <Link to="" className="rating">
                                            <ul className="list-inline">
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item half-active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <span className="text">197</span>
                                                </li>
                                            </ul>
                                        </Link>
                                        <Link to="" className="price">
                                            <small className="sale">6,900₮</small>
                                            <span className="current">6,500₮</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-five pad10">
                                <div className="single-product small-product">
                                    <div className="image-container">
                                        <Link to="">
                                            <span className="image" style={{ backgroundImage: `url(${timesale5})` }}></span>
                                        </Link>
                                        <div className="percent">
                                            <span className="text"><strong>10</strong><small>%</small></span>
                                        </div>
                                        <div className="time">
                                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                                            <span className="text">21 : 32 : 46</span>
                                        </div>
                                    </div>
                                    <div className="info-container">
                                        <Link to="" className="name">
                                            <span>Espresso</span>
                                        </Link>
                                        <Link to="" className="cat">
                                            <span>Лаазтай кофе латте</span>
                                        </Link>
                                        <Link to="" className="rating">
                                            <ul className="list-inline">
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item half-active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <span className="text">197</span>
                                                </li>
                                            </ul>
                                        </Link>
                                        <Link to="" className="price">
                                            <small className="sale">6,900₮</small>
                                            <span className="current">6,500₮</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-five pad10">
                                <div className="single-product small-product">
                                    <div className="image-container">
                                        <Link to="">
                                            <span className="image" style={{ backgroundImage: `url(${timesale5})` }}></span>
                                        </Link>
                                        <div className="percent">
                                            <span className="text"><strong>10</strong><small>%</small></span>
                                        </div>
                                        <div className="time">
                                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                                            <span className="text">21 : 32 : 46</span>
                                        </div>
                                    </div>
                                    <div className="info-container">
                                        <Link to="" className="name">
                                            <span>Шингэн кофе Американо No Brand</span>
                                        </Link>
                                        <Link to="" className="cat">
                                            <span>Лаазтай кофе латте</span>
                                        </Link>
                                        <Link to="" className="rating">
                                            <ul className="list-inline">
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item half-active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <span className="text">197</span>
                                                </li>
                                            </ul>
                                        </Link>
                                        <Link to="" className="price">
                                            <small className="sale">6,900₮</small>
                                            <span className="current">6,500₮</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="more-link text-center">
                            <Link to="" className="btn btn-border">
                                <span className="text text-uppercase">Эрэлт ихтэй бусад барааг үзэх</span>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Recently Products */}

                {/* Schedule products */}
                <div className="section section-gray">
                    <div className="container pad10">
                        <h1 className="title">
                            <span className="text-uppercase">Цагийн хямдрал</span>
                            <p className="text">
                                <Icon type="clock-circle" />
                                <span>Цагтаа амжиж худалдан авалт хийгээрэй!</span>
                            </p>
                        </h1>
                        <div className="row row10">
                            <div className="col-five pad10">
                                <div className="single-product small-product timed-product">
                                    <div className="image-container">
                                        <Link to="">
                                            <span className="image" style={{ backgroundImage: `url(${timesale1})` }}></span>
                                        </Link>
                                        <div className="percent">
                                            <span className="text"><strong>10</strong><small>%</small></span>
                                        </div>
                                        <div className="time">
                                            <Icon type="clock-circle" />
                                            <span className="text">21 : 32 : 46</span>
                                        </div>
                                    </div>
                                    <div className="info-container">
                                        <Link to="" className="name">
                                            <span>Хуурай кофе Американо No Brand</span>
                                        </Link>
                                        <Link to="" className="cat">
                                            <span>Лаазтай кофе латте Лаазтай кофе латте</span>
                                        </Link>
                                        <Link to="" className="rating">
                                            <ul className="list-inline">
                                                <li className="list-inline-item active">
                                                    <Icon type="star" />
                                                    <Icon type="star" theme="filled" />
                                                    <Icon type="star" theme="filled" />
                                                </li>
                                                <li className="list-inline-item active">
                                                    <Icon type="star" theme="filled" />
                                                    <Icon type="star" theme="filled" />
                                                </li>
                                                <li className="list-inline-item">
                                                    <span className="text">197</span>
                                                </li>
                                            </ul>
                                        </Link>
                                        <Link to="" className="price">
                                            <small className="sale">6,900₮</small>
                                            <span className="current">6,500₮</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-five pad10">
                                <div className="single-product small-product timed-product">
                                    <div className="image-container">
                                        <Link to="">
                                            <span className="image" style={{ backgroundImage: `url(${timesale2})` }}></span>
                                        </Link>
                                        <div className="percent">
                                            <span className="text"><strong>10</strong><small>%</small></span>
                                        </div>
                                        <div className="time">
                                            <Icon type="clock-circle" />
                                            <span className="text">21 : 32 : 46</span>
                                        </div>
                                    </div>
                                    <div className="info-container">
                                        <Link to="" className="name">
                                            <span>Шингэн кофе Американо No Brand</span>
                                        </Link>
                                        <Link to="" className="cat">
                                            <span>Лаазтай кофе латте урт нэр</span>
                                        </Link>
                                        <Link to="" className="rating">
                                            <ul className="list-inline">
                                                <li className="list-inline-item active">
                                                    <Icon type="star" />
                                                    <Icon type="star" theme="filled" />
                                                    <Icon type="star" theme="filled" />
                                                </li>
                                                <li className="list-inline-item active">
                                                    <Icon type="star" theme="filled" />
                                                    <Icon type="star" theme="filled" />
                                                </li>
                                                <li className="list-inline-item">
                                                    <span className="text">197</span>
                                                </li>
                                            </ul>
                                        </Link>
                                        <Link to="" className="price">
                                            <small className="sale">6,900₮</small>
                                            <span className="current">6,500₮</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-five pad10">
                                <div className="single-product small-product sale-product timed-product">
                                    <div className="image-container">
                                        <Link to="">
                                            <span className="image" style={{ backgroundImage: `url(${timesale3})` }}></span>
                                        </Link>
                                        <div className="percent">
                                            <span className="text"><strong>10</strong><small>%</small></span>
                                        </div>
                                        <div className="time">
                                            <Icon type="clock-circle" />
                                            <span className="text">21 : 32 : 46</span>
                                        </div>
                                    </div>
                                    <div className="info-container">
                                        <Link to="" className="name">
                                            <span>Шингэн кофе Американо</span>
                                        </Link>
                                        <Link to="" className="cat">
                                            <span>Лаазтай кофе латте шинэ хувилбар</span>
                                        </Link>
                                        <Link to="" className="rating">
                                            <ul className="list-inline">
                                                <li className="list-inline-item active">
                                                    <Icon type="star" />
                                                    <Icon type="star" theme="filled" />
                                                    <Icon type="star" theme="filled" />
                                                </li>
                                                <li className="list-inline-item active">
                                                    <Icon type="star" theme="filled" />
                                                    <Icon type="star" theme="filled" />
                                                </li>
                                                <li className="list-inline-item">
                                                    <span className="text">197</span>
                                                </li>
                                            </ul>
                                        </Link>
                                        <Link to="" className="price">
                                            <small className="sale">6,900₮</small>
                                            <span className="current">6,500₮</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-five pad10">
                                <div className="single-product small-product timed-product">
                                    <div className="image-container">
                                        <Link to="">
                                            <span className="image" style={{ backgroundImage: `url(${timesale4})` }}></span>
                                        </Link>
                                        <div className="percent">
                                            <span className="text"><strong>10</strong><small>%</small></span>
                                        </div>
                                        <div className="time">
                                            <Icon type="clock-circle" />
                                            <span className="text">21 : 32 : 46</span>
                                        </div>
                                    </div>
                                    <div className="info-container">
                                        <Link to="" className="name">
                                            <span>Espresso</span>
                                        </Link>
                                        <Link to="" className="cat">
                                            <span>Лаазтай кофе латте</span>
                                        </Link>
                                        <Link to="" className="rating">
                                            <ul className="list-inline">
                                                <li className="list-inline-item active">
                                                    <Icon type="star" />
                                                    <Icon type="star" theme="filled" />
                                                    <Icon type="star" theme="filled" />
                                                </li>
                                                <li className="list-inline-item active">
                                                    <Icon type="star" theme="filled" />
                                                    <Icon type="star" theme="filled" />
                                                </li>
                                            </ul>
                                        </Link>
                                        <Link to="" className="price">
                                            <small className="sale">6,900₮</small>
                                            <span className="current">6,500₮</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-five pad10">
                                <div className="single-product small-product timed-product">
                                    <div className="image-container">
                                        <Link to="">
                                            <span className="image" style={{ backgroundImage: `url(${timesale5})` }}></span>
                                        </Link>
                                        <div className="percent">
                                            <span className="text"><strong>10</strong><small>%</small></span>
                                        </div>
                                        <div className="time">
                                            <Icon type="clock-circle" />
                                            <span className="text">21 : 32 : 46</span>
                                        </div>
                                    </div>
                                    <div className="info-container">
                                        <Link to="" className="name">
                                            <span>Шингэн кофе Американо No Brand</span>
                                        </Link>
                                        <Link to="" className="cat">
                                            <span>Лаазтай кофе латте</span>
                                        </Link>
                                        <Link to="" className="rating">
                                            <ul className="list-inline">
                                                <li className="list-inline-item active">
                                                    <Icon type="star" />
                                                    <Icon type="star" theme="filled" />
                                                    <Icon type="star" theme="filled" />
                                                </li>
                                                <li className="list-inline-item active">
                                                    <Icon type="star" theme="filled" />
                                                    <Icon type="star" theme="filled" />
                                                </li>
                                                <li className="list-inline-item">
                                                    <span className="text">197</span>
                                                </li>
                                            </ul>
                                        </Link>
                                        <Link to="" className="price">
                                            <small className="sale">6,900₮</small>
                                            <span className="current">6,500₮</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row row10">
                            <div className="col-xl-4 pad10">
                                <div className="single-product big-product sale-product timed-product">
                                    <div className="image-container">
                                        <Link to="">
                                            <span className="image" style={{ backgroundImage: `url(${timesale6})` }}></span>
                                        </Link>
                                        <div className="percent">
                                            <span className="text"><strong>10</strong><small>%</small></span>
                                        </div>
                                        <div className="time">
                                            <Icon type="clock-circle" />
                                            <span className="text">21 : 32 : 46</span>
                                        </div>
                                    </div>
                                    <div className="info-container">
                                        <Link to="" className="name">
                                            <span>Шингэн кофе Американо No Brand</span>
                                        </Link>
                                        <Link to="" className="cat">
                                            <span>Лаазтай кофе латте</span>
                                        </Link>
                                        <Link to="" className="rating">
                                            <ul className="list-inline">
                                                <li className="list-inline-item active">
                                                    <Icon type="star" />
                                                    <Icon type="star" theme="filled" />
                                                    <Icon type="star" theme="filled" />
                                                </li>
                                                <li className="list-inline-item active">
                                                    <Icon type="star" theme="filled" />
                                                    <Icon type="star" theme="filled" />
                                                </li>
                                                <li className="list-inline-item">
                                                    <span className="text">197</span>
                                                </li>
                                            </ul>
                                        </Link>
                                        <Link to="" className="price">
                                            <small className="sale">6,900₮</small>
                                            <span className="current">6,500₮</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 pad10">
                                <div className="single-product big-product timed-product">
                                    <div className="image-container">
                                        <Link to="">
                                            <span className="image" style={{ backgroundImage: `url(${timesale7})` }}></span>
                                        </Link>
                                        <div className="percent">
                                            <span className="text"><strong>10</strong><small>%</small></span>
                                        </div>
                                        <div className="time">
                                            <Icon type="clock-circle" />
                                            <span className="text">21 : 32 : 46</span>
                                        </div>
                                    </div>
                                    <div className="info-container">
                                        <Link to="" className="name">
                                            <span>Шингэн кофе Американо No Brand</span>
                                        </Link>
                                        <Link to="" className="cat">
                                            <span>Лаазтай кофе латте</span>
                                        </Link>
                                        <Link to="" className="rating">
                                            <ul className="list-inline">
                                                <li className="list-inline-item active">
                                                    <Icon type="star" />
                                                    <Icon type="star" theme="filled" />
                                                    <Icon type="star" theme="filled" />
                                                </li>
                                                <li className="list-inline-item active">
                                                    <Icon type="star" theme="filled" />
                                                    <Icon type="star" theme="filled" />
                                                </li>
                                                <li className="list-inline-item">
                                                    <span className="text">197</span>
                                                </li>
                                            </ul>
                                        </Link>
                                        <Link to="" className="price">
                                            <small className="sale">6,900₮</small>
                                            <span className="current">6,500₮</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 pad10">
                                <div className="single-product big-product timed-product">
                                    <div className="image-container">
                                        <Link to="">
                                            <span className="image" style={{ backgroundImage: `url(${timesale5})` }}></span>
                                        </Link>
                                        <div className="percent">
                                            <span className="text"><strong>10</strong><small>%</small></span>
                                        </div>
                                        <div className="time">
                                            <Icon type="clock-circle" />
                                            <span className="text">21 : 32 : 46</span>
                                        </div>
                                    </div>
                                    <div className="info-container">
                                        <Link to="" className="name">
                                            <span>Шингэн кофе Американо No Brand</span>
                                        </Link>
                                        <Link to="" className="cat">
                                            <span>Лаазтай кофе латте</span>
                                        </Link>
                                        <Link to="" className="rating">
                                            <ul className="list-inline">
                                                <li className="list-inline-item active">
                                                    <Icon type="star" />
                                                    <Icon type="star" theme="filled" />
                                                    <Icon type="star" theme="filled" />
                                                </li>
                                                <li className="list-inline-item active">
                                                    <Icon type="star" theme="filled" />
                                                    <Icon type="star" theme="filled" />
                                                </li>
                                                <li className="list-inline-item">
                                                    <span className="text">197</span>
                                                </li>
                                            </ul>
                                        </Link>
                                        <Link to="" className="price">
                                            <small className="sale">6,900₮</small>
                                            <span className="current">6,500₮</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="more-link text-center">
                            <Link to="" className="btn btn-border">
                                <span className="text text-uppercase">Цагийн хямдралтай бусад барааг үзэх</span>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Schedule products */}

                {/* Banner */}
                <div className="banner-container" >
                    <span style={{ backgroundImage: `url(${timesale6})` }}></span>
                    <div className="container pad10">
                        <Link to="">
                            <img alt="banner" src={timesale6} className="img-fluid" />
                        </Link>
                    </div>
                </div>
                {/* Banner */}

                {/* Only Online shop product */}
                <div className="section">
                    <div className="container pad10">
                        <h1 className="title">
                            <span className="text-uppercase">ЗӨВХӨН ОНЛАЙН ДЭЛГҮҮРТ</span>
                        </h1>
                        <div className="row row10">
                            <div className="col-xl-4 pad10">
                                <div className="single-product big-product sale-product timed-product">
                                    <div className="image-container">
                                        <Link to="">
                                            <span className="image" style={{ backgroundImage: `url(${timesale5})` }}></span>
                                        </Link>
                                        <div className="percent">
                                            <span className="text"><strong>10</strong><small>%</small></span>
                                        </div>
                                        <div className="time">
                                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                                            <span className="text">21 : 32 : 46</span>
                                        </div>
                                    </div>
                                    <div className="info-container">
                                        <Link to="" className="name">
                                            <span>Шингэн кофе Американо No Brand</span>
                                        </Link>
                                        <Link to="" className="cat">
                                            <span>Лаазтай кофе латте</span>
                                        </Link>
                                        <Link to="" className="rating">
                                            <ul className="list-inline">
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item half-active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <span className="text">197</span>
                                                </li>
                                            </ul>
                                        </Link>
                                        <Link to="" className="price">
                                            <small className="sale">6,900₮</small>
                                            <span className="current">6,500₮</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 pad10">
                                <div className="single-product big-product">
                                    <div className="image-container">
                                        <Link to="">
                                            <span className="image" style={{ backgroundImage: `url(${timesale5})` }}></span>
                                        </Link>
                                        <div className="percent">
                                            <span className="text"><strong>10</strong><small>%</small></span>
                                        </div>
                                        <div className="time">
                                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                                            <span className="text">21 : 32 : 46</span>
                                        </div>
                                    </div>
                                    <div className="info-container">
                                        <Link to="" className="name">
                                            <span>Шингэн кофе Американо No Brand</span>
                                        </Link>
                                        <Link to="" className="cat">
                                            <span>Лаазтай кофе латте</span>
                                        </Link>
                                        <Link to="" className="rating">
                                            <ul className="list-inline">
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item half-active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <span className="text">197</span>
                                                </li>
                                            </ul>
                                        </Link>
                                        <Link to="" className="price">
                                            <small className="sale">6,900₮</small>
                                            <span className="current">6,500₮</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 pad10">
                                <div className="single-product big-product">
                                    <div className="image-container">
                                        <Link to="">
                                            <span className="image" style={{ backgroundImage: `url(${timesale5})` }}></span>
                                        </Link>
                                        <div className="percent">
                                            <span className="text"><strong>10</strong><small>%</small></span>
                                        </div>
                                        <div className="time">
                                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                                            <span className="text">21 : 32 : 46</span>
                                        </div>
                                    </div>
                                    <div className="info-container">
                                        <Link to="" className="name">
                                            <span>Шингэн кофе Американо No Brand</span>
                                        </Link>
                                        <Link to="" className="cat">
                                            <span>Лаазтай кофе латте</span>
                                        </Link>
                                        <Link to="" className="rating">
                                            <ul className="list-inline">
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item half-active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <span className="text">197</span>
                                                </li>
                                            </ul>
                                        </Link>
                                        <Link to="" className="price">
                                            <small className="sale">6,900₮</small>
                                            <span className="current">6,500₮</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row row10">
                            <div className="col-five pad10">
                                <div className="single-product small-product">
                                    <div className="image-container">
                                        <Link to="">
                                            <span className="image" style={{ backgroundImage: `url(${timesale5})` }}></span>
                                        </Link>
                                        <div className="percent">
                                            <span className="text"><strong>10</strong><small>%</small></span>
                                        </div>
                                        <div className="time">
                                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                                            <span className="text">21 : 32 : 46</span>
                                        </div>
                                    </div>
                                    <div className="info-container">
                                        <Link to="" className="name">
                                            <span>Хуурай кофе Американо No Brand</span>
                                        </Link>
                                        <Link to="" className="cat">
                                            <span>Лаазтай кофе латте Лаазтай кофе латте</span>
                                        </Link>
                                        <Link to="" className="rating">
                                            <ul className="list-inline">
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item half-active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <span className="text">197</span>
                                                </li>
                                            </ul>
                                        </Link>
                                        <Link to="" className="price">
                                            <small className="sale">6,900₮</small>
                                            <span className="current">6,500₮</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-five pad10">
                                <div className="single-product small-product">
                                    <div className="image-container">
                                        <Link to="">
                                            <span className="image" style={{ backgroundImage: `url(${timesale5})` }}></span>
                                        </Link>
                                        <div className="percent">
                                            <span className="text"><strong>10</strong><small>%</small></span>
                                        </div>
                                        <div className="time">
                                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                                            <span className="text">21 : 32 : 46</span>
                                        </div>
                                    </div>
                                    <div className="info-container">
                                        <Link to="" className="name">
                                            <span>Шингэн кофе Американо No Brand</span>
                                        </Link>
                                        <Link to="" className="cat">
                                            <span>Лаазтай кофе латте урт нэр</span>
                                        </Link>
                                        <Link to="" className="rating">
                                            <ul className="list-inline">
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item half-active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <span className="text">197</span>
                                                </li>
                                            </ul>
                                        </Link>
                                        <Link to="" className="price">
                                            <small className="sale">6,900₮</small>
                                            <span className="current">6,500₮</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-five pad10">
                                <div className="single-product small-product sale-product timed-product">
                                    <div className="image-container">
                                        <Link to="">
                                            <span className="image" style={{ backgroundImage: `url(${timesale5})` }}></span>
                                        </Link>
                                        <div className="percent">
                                            <span className="text"><strong>10</strong><small>%</small></span>
                                        </div>
                                        <div className="time">
                                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                                            <span className="text">21 : 32 : 46</span>
                                        </div>
                                    </div>
                                    <div className="info-container">
                                        <Link to="" className="name">
                                            <span>Шингэн кофе Американо</span>
                                        </Link>
                                        <Link to="" className="cat">
                                            <span>Лаазтай кофе латте шинэ хувилбар</span>
                                        </Link>
                                        <Link to="" className="rating">
                                            <ul className="list-inline">
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item half-active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <span className="text">197</span>
                                                </li>
                                            </ul>
                                        </Link>
                                        <Link to="" className="price">
                                            <small className="sale">6,900₮</small>
                                            <span className="current">6,500₮</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-five pad10">
                                <div className="single-product small-product">
                                    <div className="image-container">
                                        <Link to="">
                                            <span className="image" style={{ backgroundImage: `url(${timesale5})` }}></span>
                                        </Link>
                                        <div className="percent">
                                            <span className="text"><strong>10</strong><small>%</small></span>
                                        </div>
                                        <div className="time">
                                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                                            <span className="text">21 : 32 : 46</span>
                                        </div>
                                    </div>
                                    <div className="info-container">
                                        <Link to="" className="name">
                                            <span>Espresso</span>
                                        </Link>
                                        <Link to="" className="cat">
                                            <span>Лаазтай кофе латте</span>
                                        </Link>
                                        <Link to="" className="rating">
                                            <ul className="list-inline">
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item half-active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <span className="text">197</span>
                                                </li>
                                            </ul>
                                        </Link>
                                        <Link to="" className="price">
                                            <small className="sale">6,900₮</small>
                                            <span className="current">6,500₮</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-five pad10">
                                <div className="single-product small-product">
                                    <div className="image-container">
                                        <Link to="">
                                            <span className="image" style={{ backgroundImage: `url(${timesale5})` }}></span>
                                        </Link>
                                        <div className="percent">
                                            <span className="text"><strong>10</strong><small>%</small></span>
                                        </div>
                                        <div className="time">
                                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                                            <span className="text">21 : 32 : 46</span>
                                        </div>
                                    </div>
                                    <div className="info-container">
                                        <Link to="" className="name">
                                            <span>Шингэн кофе Американо No Brand</span>
                                        </Link>
                                        <Link to="" className="cat">
                                            <span>Лаазтай кофе латте</span>
                                        </Link>
                                        <Link to="" className="rating">
                                            <ul className="list-inline">
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item half-active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <span className="text">197</span>
                                                </li>
                                            </ul>
                                        </Link>
                                        <Link to="" className="price">
                                            <small className="sale">6,900₮</small>
                                            <span className="current">6,500₮</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="more-link text-center">
                            <Link to="" className="btn btn-border">
                                <span className="text text-uppercase">Эрэлт ихтэй бусад барааг үзэх</span>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Only Online shop product */}

                {/* Sales */}
                <div className="section section-gray">
                    <div className="container pad10">
                        <h1 className="title">
                            <span className="text-uppercase">Хямдралтай бүтээгдэхүүн</span>
                            <p className="date">
                                <i className="fa fa-calendar" aria-hidden="true"></i>
                                <span>09/05 - 10/05</span>
                            </p>
                        </h1>
                        <div className="row row10">
                            <div className="col-five pad10">
                                <div className="single-product small-product sale-product">
                                    <div className="image-container">
                                        <Link to="">
                                            <span className="image" style={{ backgroundImage: `url(${timesale5})` }}></span>
                                        </Link>
                                        <div className="percent">
                                            <span className="text"><strong>10</strong><small>%</small></span>
                                        </div>
                                        <div className="time">
                                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                                            <span className="text">21 : 32 : 46</span>
                                        </div>
                                    </div>
                                    <div className="info-container">
                                        <Link to="" className="name">
                                            <span>Хуурай кофе Американо No Brand</span>
                                        </Link>
                                        <Link to="" className="cat">
                                            <span>Лаазтай кофе латте Лаазтай кофе латте</span>
                                        </Link>
                                        <Link to="" className="rating">
                                            <ul className="list-inline">
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item half-active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <span className="text">197</span>
                                                </li>
                                            </ul>
                                        </Link>
                                        <Link to="" className="price">
                                            <small className="sale">6,900₮</small>
                                            <span className="current">6,500₮</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-five pad10">
                                <div className="single-product small-product sale-product">
                                    <div className="image-container">
                                        <Link to="">
                                            <span className="image" style={{ backgroundImage: `url(${timesale5})` }}></span>
                                        </Link>
                                        <div className="percent">
                                            <span className="text"><strong>10</strong><small>%</small></span>
                                        </div>
                                        <div className="time">
                                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                                            <span className="text">21 : 32 : 46</span>
                                        </div>
                                    </div>
                                    <div className="info-container">
                                        <Link to="" className="name">
                                            <span>Шингэн кофе Американо No Brand</span>
                                        </Link>
                                        <Link to="" className="cat">
                                            <span>Лаазтай кофе латте урт нэр</span>
                                        </Link>
                                        <Link to="" className="rating">
                                            <ul className="list-inline">
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item half-active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <span className="text">197</span>
                                                </li>
                                            </ul>
                                        </Link>
                                        <Link to="" className="price">
                                            <small className="sale">6,900₮</small>
                                            <span className="current">6,500₮</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-five pad10">
                                <div className="single-product small-product sale-product">
                                    <div className="image-container">
                                        <Link to="">
                                            <span className="image" style={{ backgroundImage: `url(${timesale5})` }}></span>
                                        </Link>
                                        <div className="percent">
                                            <span className="text"><strong>10</strong><small>%</small></span>
                                        </div>
                                        <div className="time">
                                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                                            <span className="text">21 : 32 : 46</span>
                                        </div>
                                    </div>
                                    <div className="info-container">
                                        <Link to="" className="name">
                                            <span>Шингэн кофе Американо</span>
                                        </Link>
                                        <Link to="" className="cat">
                                            <span>Лаазтай кофе латте шинэ хувилбар</span>
                                        </Link>
                                        <Link to="" className="rating">
                                            <ul className="list-inline">
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item half-active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <span className="text">197</span>
                                                </li>
                                            </ul>
                                        </Link>
                                        <Link to="" className="price">
                                            <small className="sale">6,900₮</small>
                                            <span className="current">6,500₮</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-five pad10">
                                <div className="single-product small-product sale-product">
                                    <div className="image-container">
                                        <Link to="">
                                            <span className="image" style={{ backgroundImage: `url(${timesale5})` }}></span>
                                        </Link>
                                        <div className="percent">
                                            <span className="text"><strong>10</strong><small>%</small></span>
                                        </div>
                                        <div className="time">
                                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                                            <span className="text">21 : 32 : 46</span>
                                        </div>
                                    </div>
                                    <div className="info-container">
                                        <Link to="" className="name">
                                            <span>Espresso</span>
                                        </Link>
                                        <Link to="" className="cat">
                                            <span>Лаазтай кофе латте</span>
                                        </Link>
                                        <Link to="" className="rating">
                                            <ul className="list-inline">
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item half-active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <span className="text">197</span>
                                                </li>
                                            </ul>
                                        </Link>
                                        <Link to="" className="price">
                                            <small className="sale">6,900₮</small>
                                            <span className="current">6,500₮</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-five pad10">
                                <div className="single-product small-product sale-product">
                                    <div className="image-container">
                                        <Link to="">
                                            <span className="image" style={{ backgroundImage: `url(${timesale5})` }}></span>
                                        </Link>
                                        <div className="percent">
                                            <span className="text"><strong>10</strong><small>%</small></span>
                                        </div>
                                        <div className="time">
                                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                                            <span className="text">21 : 32 : 46</span>
                                        </div>
                                    </div>
                                    <div className="info-container">
                                        <Link to="" className="name">
                                            <span>Шингэн кофе Американо No Brand</span>
                                        </Link>
                                        <Link to="" className="cat">
                                            <span>Лаазтай кофе латте</span>
                                        </Link>
                                        <Link to="" className="rating">
                                            <ul className="list-inline">
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item half-active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <span className="text">197</span>
                                                </li>
                                            </ul>
                                        </Link>
                                        <Link to="" className="price">
                                            <small className="sale">6,900₮</small>
                                            <span className="current">6,500₮</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="more-link text-center">
                            <Link to="" className="btn btn-border">
                                <span className="text text-uppercase">Хямдралтай бусад барааг үзэх</span>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Sales */}

                <div className="banner-container" >
                    <span style={{ backgroundImage: `url(${timesale7})` }}></span>
                    <div className="container pad10">
                        <Link to="">
                            <img alt="banner" src={timesale7} className="img-fluid" />
                        </Link>
                    </div>
                </div>

                {/* Ehow */}
                <div className="section section-gray">
                    <div className="container pad10">
                        <h1 className="title">
                            <span className="text-uppercase">Хоолны жор</span>
                            <p className="text">
                                <i className="fa fa-home" aria-hidden="true"></i>
                                <span>Гэр бүлдээ сайхан хоол хийж өгөхөд тань туслах жор</span>
                            </p>
                        </h1>
                        <div className="row row10">
                            <div className="col-xl-4 pad10">
                                <div className="single-product big-product food-post food-long">
                                    <div className="image-container">
                                        <Link to="">
                                            <span className="image" style={{ backgroundImage: `url(${ehow1})` }}></span>
                                        </Link>
                                        <div className="percent">
                                            <span className="text"><strong>12ш</strong><small>Жор</small></span>
                                        </div>
                                        <div className="time">
                                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                                            <span className="text">21 : 32 : 46</span>
                                        </div>
                                    </div>
                                    <div className="info-container">
                                        <Link to="" className="name">
                                            <span>Шингэн кофе Американо No Brand</span>
                                        </Link>
                                        <Link to="" className="cat">
                                            <span>Лаазтай кофе латте</span>
                                        </Link>
                                        <Link to="" className="rating">
                                            <ul className="list-inline">
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item half-active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <span className="text">197</span>
                                                </li>
                                            </ul>
                                        </Link>
                                    </div>
                                </div>
                                <div className="single-product big-product food-post food-short">
                                    <div className="image-container">
                                        <Link to="">
                                            <span className="image" style={{ backgroundImage: `url(${ehow2})` }}></span>
                                        </Link>
                                        <div className="percent">
                                            <span className="text"><strong>12ш</strong><small>Жор</small></span>
                                        </div>
                                        <div className="time">
                                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                                            <span className="text">21 : 32 : 46</span>
                                        </div>
                                    </div>
                                    <div className="info-container">
                                        <Link to="" className="name">
                                            <span>Шингэн кофе Американо No Brand</span>
                                        </Link>
                                        <Link to="" className="cat">
                                            <span>Лаазтай кофе латте</span>
                                        </Link>
                                        <Link to="" className="rating">
                                            <ul className="list-inline">
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item half-active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <span className="text">197</span>
                                                </li>
                                            </ul>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 pad10">
                                <div className="single-product big-product food-post food-short">
                                    <div className="image-container">
                                        <Link to="">
                                            <span className="image" style={{ backgroundImage: `url(${ehow3})` }}></span>
                                        </Link>
                                        <div className="percent">
                                            <span className="text"><strong>12ш</strong><small>Жор</small></span>
                                        </div>
                                        <div className="time">
                                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                                            <span className="text">21 : 32 : 46</span>
                                        </div>
                                    </div>
                                    <div className="info-container">
                                        <Link to="" className="name">
                                            <span>Шингэн кофе Американо No Brand</span>
                                        </Link>
                                        <Link to="" className="cat">
                                            <span>Лаазтай кофе латте</span>
                                        </Link>
                                        <Link to="" className="rating">
                                            <ul className="list-inline">
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item half-active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <span className="text">197</span>
                                                </li>
                                            </ul>
                                        </Link>
                                    </div>
                                </div>
                                <div className="single-product big-product food-post food-long">
                                    <div className="image-container">
                                        <Link to="">
                                            <span className="image" style={{ backgroundImage: `url(${ehow4})` }}></span>
                                        </Link>
                                        <div className="percent">
                                            <span className="text"><strong>12ш</strong><small>Жор</small></span>
                                        </div>
                                        <div className="time">
                                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                                            <span className="text">21 : 32 : 46</span>
                                        </div>
                                    </div>
                                    <div className="info-container">
                                        <Link to="" className="name">
                                            <span>Шингэн кофе Американо No Brand</span>
                                        </Link>
                                        <Link to="" className="cat">
                                            <span>Лаазтай кофе латте</span>
                                        </Link>
                                        <Link to="" className="rating">
                                            <ul className="list-inline">
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item half-active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <span className="text">197</span>
                                                </li>
                                            </ul>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 pad10">
                                <div className="single-product big-product food-post food-long">
                                    <div className="image-container">
                                        <Link to="">
                                            <span className="image" style={{ backgroundImage: `url(${ehow5})` }}></span>
                                        </Link>
                                        <div className="percent">
                                            <span className="text"><strong>12ш</strong><small>Жор</small></span>
                                        </div>
                                        <div className="time">
                                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                                            <span className="text">21 : 32 : 46</span>
                                        </div>
                                    </div>
                                    <div className="info-container">
                                        <Link to="" className="name">
                                            <span>Шингэн кофе Американо No Brand</span>
                                        </Link>
                                        <Link to="" className="cat">
                                            <span>Лаазтай кофе латте</span>
                                        </Link>
                                        <Link to="" className="rating">
                                            <ul className="list-inline">
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item half-active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <span className="text">197</span>
                                                </li>
                                            </ul>
                                        </Link>
                                    </div>
                                </div>
                                <div className="single-product big-product food-post food-short">
                                    <div className="image-container">
                                        <Link to="">
                                            <span className="image" style={{ backgroundImage: `url(${ehow4})` }}></span>
                                        </Link>
                                        <div className="percent">
                                            <span className="text"><strong>12ш</strong><small>Жор</small></span>
                                        </div>
                                        <div className="time">
                                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                                            <span className="text">21 : 32 : 46</span>
                                        </div>
                                    </div>
                                    <div className="info-container">
                                        <Link to="" className="name">
                                            <span>Шингэн кофе Американо No Brand</span>
                                        </Link>
                                        <Link to="" className="cat">
                                            <span>Лаазтай кофе латте</span>
                                        </Link>
                                        <Link to="" className="rating">
                                            <ul className="list-inline">
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item half-active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <span className="text">197</span>
                                                </li>
                                            </ul>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="more-link text-center">
                            <Link to="" className="btn btn-border">
                                <span className="text text-uppercase">Бусад жор үзэх</span>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Ehow */}

                {/* Package product */}
                <div className="section">
                    <div className="container pad10">
                        <h1 className="title">
                            <span className="text-uppercase">БАГЦЫН БАРАА</span>
                            <p className="text">
                                <Icon type="clock-circle" />
                                <span>
                                    Таньд хэрэгтэй бүтээгдэхүүнүүд нэг багцад байна
                                </span>
                            </p>
                        </h1>
                        <div className="row row10">
                            <div className="col-xl-4 pad10">
                                <div className="single-product big-product sale-product timed-product">
                                    <div className="image-container">
                                        <Link to="">
                                            <span className="image" style={{ backgroundImage: `url(${timesale5})` }}></span>
                                        </Link>
                                        <div className="percent">
                                            <span className="text"><strong>10</strong><small>%</small></span>
                                        </div>
                                        <div className="time">
                                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                                            <span className="text">21 : 32 : 46</span>
                                        </div>
                                    </div>
                                    <div className="info-container">
                                        <Link to="" className="name">
                                            <span>Шингэн кофе Американо No Brand</span>
                                        </Link>
                                        <Link to="" className="cat">
                                            <span>Лаазтай кофе латте</span>
                                        </Link>
                                        <Link to="" className="rating">
                                            <ul className="list-inline">
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item half-active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <span className="text">197</span>
                                                </li>
                                            </ul>
                                        </Link>
                                        <Link to="" className="price">
                                            <small className="sale">6,900₮</small>
                                            <span className="current">6,500₮</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 pad10">
                                <div className="single-product big-product">
                                    <div className="image-container">
                                        <Link to="">
                                            <span className="image" style={{ backgroundImage: `url(${timesale5})` }}></span>
                                        </Link>
                                        <div className="percent">
                                            <span className="text"><strong>10</strong><small>%</small></span>
                                        </div>
                                        <div className="time">
                                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                                            <span className="text">21 : 32 : 46</span>
                                        </div>
                                    </div>
                                    <div className="info-container">
                                        <Link to="" className="name">
                                            <span>Шингэн кофе Американо No Brand</span>
                                        </Link>
                                        <Link to="" className="cat">
                                            <span>Лаазтай кофе латте</span>
                                        </Link>
                                        <Link to="" className="rating">
                                            <ul className="list-inline">
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item half-active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <span className="text">197</span>
                                                </li>
                                            </ul>
                                        </Link>
                                        <Link to="" className="price">
                                            <small className="sale">6,900₮</small>
                                            <span className="current">6,500₮</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 pad10">
                                <div className="single-product big-product">
                                    <div className="image-container">
                                        <Link to="">
                                            <span className="image" style={{ backgroundImage: `url(${timesale5})` }}></span>
                                        </Link>
                                        <div className="percent">
                                            <span className="text"><strong>10</strong><small>%</small></span>
                                        </div>
                                        <div className="time">
                                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                                            <span className="text">21 : 32 : 46</span>
                                        </div>
                                    </div>
                                    <div className="info-container">
                                        <Link to="" className="name">
                                            <span>Шингэн кофе Американо No Brand</span>
                                        </Link>
                                        <Link to="" className="cat">
                                            <span>Лаазтай кофе латте</span>
                                        </Link>
                                        <Link to="" className="rating">
                                            <ul className="list-inline">
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item half-active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <span className="text">197</span>
                                                </li>
                                            </ul>
                                        </Link>
                                        <Link to="" className="price">
                                            <small className="sale">6,900₮</small>
                                            <span className="current">6,500₮</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row row10">
                            <div className="col-five pad10">
                                <div className="single-product small-product">
                                    <div className="image-container">
                                        <Link to="">
                                            <span className="image" style={{ backgroundImage: `url(${timesale5})` }}></span>
                                        </Link>
                                        <div className="percent">
                                            <span className="text"><strong>10</strong><small>%</small></span>
                                        </div>
                                        <div className="time">
                                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                                            <span className="text">21 : 32 : 46</span>
                                        </div>
                                    </div>
                                    <div className="info-container">
                                        <Link to="" className="name">
                                            <span>Хуурай кофе Американо No Brand</span>
                                        </Link>
                                        <Link to="" className="cat">
                                            <span>Лаазтай кофе латте Лаазтай кофе латте</span>
                                        </Link>
                                        <Link to="" className="rating">
                                            <ul className="list-inline">
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item half-active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <span className="text">197</span>
                                                </li>
                                            </ul>
                                        </Link>
                                        <Link to="" className="price">
                                            <small className="sale">6,900₮</small>
                                            <span className="current">6,500₮</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-five pad10">
                                <div className="single-product small-product">
                                    <div className="image-container">
                                        <Link to="">
                                            <span className="image" style={{ backgroundImage: `url(${timesale5})` }}></span>
                                        </Link>
                                        <div className="percent">
                                            <span className="text"><strong>10</strong><small>%</small></span>
                                        </div>
                                        <div className="time">
                                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                                            <span className="text">21 : 32 : 46</span>
                                        </div>
                                    </div>
                                    <div className="info-container">
                                        <Link to="" className="name">
                                            <span>Шингэн кофе Американо No Brand</span>
                                        </Link>
                                        <Link to="" className="cat">
                                            <span>Лаазтай кофе латте урт нэр</span>
                                        </Link>
                                        <Link to="" className="rating">
                                            <ul className="list-inline">
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item half-active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <span className="text">197</span>
                                                </li>
                                            </ul>
                                        </Link>
                                        <Link to="" className="price">
                                            <small className="sale">6,900₮</small>
                                            <span className="current">6,500₮</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-five pad10">
                                <div className="single-product small-product sale-product timed-product">
                                    <div className="image-container">
                                        <Link to="">
                                            <span className="image" style={{ backgroundImage: `url(${timesale5})` }}></span>
                                        </Link>
                                        <div className="percent">
                                            <span className="text"><strong>10</strong><small>%</small></span>
                                        </div>
                                        <div className="time">
                                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                                            <span className="text">21 : 32 : 46</span>
                                        </div>
                                    </div>
                                    <div className="info-container">
                                        <Link to="" className="name">
                                            <span>Шингэн кофе Американо</span>
                                        </Link>
                                        <Link to="" className="cat">
                                            <span>Лаазтай кофе латте шинэ хувилбар</span>
                                        </Link>
                                        <Link to="" className="rating">
                                            <ul className="list-inline">
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item half-active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <span className="text">197</span>
                                                </li>
                                            </ul>
                                        </Link>
                                        <Link to="" className="price">
                                            <small className="sale">6,900₮</small>
                                            <span className="current">6,500₮</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-five pad10">
                                <div className="single-product small-product">
                                    <div className="image-container">
                                        <Link to="">
                                            <span className="image" style={{ backgroundImage: `url(${timesale5})` }}></span>
                                        </Link>
                                        <div className="percent">
                                            <span className="text"><strong>10</strong><small>%</small></span>
                                        </div>
                                        <div className="time">
                                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                                            <span className="text">21 : 32 : 46</span>
                                        </div>
                                    </div>
                                    <div className="info-container">
                                        <Link to="" className="name">
                                            <span>Espresso</span>
                                        </Link>
                                        <Link to="" className="cat">
                                            <span>Лаазтай кофе латте</span>
                                        </Link>
                                        <Link to="" className="rating">
                                            <ul className="list-inline">
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item half-active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <span className="text">197</span>
                                                </li>
                                            </ul>
                                        </Link>
                                        <Link to="" className="price">
                                            <small className="sale">6,900₮</small>
                                            <span className="current">6,500₮</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-five pad10">
                                <div className="single-product small-product">
                                    <div className="image-container">
                                        <Link to="">
                                            <span className="image" style={{ backgroundImage: `url(${timesale5})` }}></span>
                                        </Link>
                                        <div className="percent">
                                            <span className="text"><strong>10</strong><small>%</small></span>
                                        </div>
                                        <div className="time">
                                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                                            <span className="text">21 : 32 : 46</span>
                                        </div>
                                    </div>
                                    <div className="info-container">
                                        <Link to="" className="name">
                                            <span>Шингэн кофе Американо No Brand</span>
                                        </Link>
                                        <Link to="" className="cat">
                                            <span>Лаазтай кофе латте</span>
                                        </Link>
                                        <Link to="" className="rating">
                                            <ul className="list-inline">
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item half-active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <span className="text">197</span>
                                                </li>
                                            </ul>
                                        </Link>
                                        <Link to="" className="price">
                                            <small className="sale">6,900₮</small>
                                            <span className="current">6,500₮</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="more-link text-center">
                            <Link to="" className="btn btn-border">
                                <span className="text text-uppercase">Эрэлт ихтэй бусад барааг үзэх</span>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Only Online shop product */}

                {/* Only eMart */}
                <div className="section section-gray">
                    <div className="container pad10">
                        <h1 className="title">
                            <span className="text-uppercase">ЗӨВХӨН И-МАРТ ДЭЛГҮҮРТ</span>
                            <p className="date">
                                <i className="fa fa-calendar" aria-hidden="true"></i>
                                <span>09/05 - 10/05</span>
                            </p>
                        </h1>
                        <div className="row row10">
                            <div className="col-five pad10">
                                <div className="single-product small-product sale-product">
                                    <div className="image-container">
                                        <Link to="">
                                            <span className="image" style={{ backgroundImage: `url(${timesale5})` }}></span>
                                        </Link>
                                        <div className="percent">
                                            <span className="text"><strong>10</strong><small>%</small></span>
                                        </div>
                                        <div className="time">
                                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                                            <span className="text">21 : 32 : 46</span>
                                        </div>
                                    </div>
                                    <div className="info-container">
                                        <Link to="" className="name">
                                            <span>Хуурай кофе Американо No Brand</span>
                                        </Link>
                                        <Link to="" className="cat">
                                            <span>Лаазтай кофе латте Лаазтай кофе латте</span>
                                        </Link>
                                        <Link to="" className="rating">
                                            <ul className="list-inline">
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item half-active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <span className="text">197</span>
                                                </li>
                                            </ul>
                                        </Link>
                                        <Link to="" className="price">
                                            <small className="sale">6,900₮</small>
                                            <span className="current">6,500₮</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-five pad10">
                                <div className="single-product small-product sale-product">
                                    <div className="image-container">
                                        <Link to="">
                                            <span className="image" style={{ backgroundImage: `url(${timesale5})` }}></span>
                                        </Link>
                                        <div className="percent">
                                            <span className="text"><strong>10</strong><small>%</small></span>
                                        </div>
                                        <div className="time">
                                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                                            <span className="text">21 : 32 : 46</span>
                                        </div>
                                    </div>
                                    <div className="info-container">
                                        <Link to="" className="name">
                                            <span>Шингэн кофе Американо No Brand</span>
                                        </Link>
                                        <Link to="" className="cat">
                                            <span>Лаазтай кофе латте урт нэр</span>
                                        </Link>
                                        <Link to="" className="rating">
                                            <ul className="list-inline">
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item half-active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <span className="text">197</span>
                                                </li>
                                            </ul>
                                        </Link>
                                        <Link to="" className="price">
                                            <small className="sale">6,900₮</small>
                                            <span className="current">6,500₮</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-five pad10">
                                <div className="single-product small-product sale-product">
                                    <div className="image-container">
                                        <Link to="">
                                            <span className="image" style={{ backgroundImage: `url(${timesale5})` }}></span>
                                        </Link>
                                        <div className="percent">
                                            <span className="text"><strong>10</strong><small>%</small></span>
                                        </div>
                                        <div className="time">
                                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                                            <span className="text">21 : 32 : 46</span>
                                        </div>
                                    </div>
                                    <div className="info-container">
                                        <Link to="" className="name">
                                            <span>Шингэн кофе Американо</span>
                                        </Link>
                                        <Link to="" className="cat">
                                            <span>Лаазтай кофе латте шинэ хувилбар</span>
                                        </Link>
                                        <Link to="" className="rating">
                                            <ul className="list-inline">
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item half-active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <span className="text">197</span>
                                                </li>
                                            </ul>
                                        </Link>
                                        <Link to="" className="price">
                                            <small className="sale">6,900₮</small>
                                            <span className="current">6,500₮</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-five pad10">
                                <div className="single-product small-product sale-product">
                                    <div className="image-container">
                                        <Link to="">
                                            <span className="image" style={{ backgroundImage: `url(${timesale5})` }}></span>
                                        </Link>
                                        <div className="percent">
                                            <span className="text"><strong>10</strong><small>%</small></span>
                                        </div>
                                        <div className="time">
                                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                                            <span className="text">21 : 32 : 46</span>
                                        </div>
                                    </div>
                                    <div className="info-container">
                                        <Link to="" className="name">
                                            <span>Espresso</span>
                                        </Link>
                                        <Link to="" className="cat">
                                            <span>Лаазтай кофе латте</span>
                                        </Link>
                                        <Link to="" className="rating">
                                            <ul className="list-inline">
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item half-active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <span className="text">197</span>
                                                </li>
                                            </ul>
                                        </Link>
                                        <Link to="" className="price">
                                            <small className="sale">6,900₮</small>
                                            <span className="current">6,500₮</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-five pad10">
                                <div className="single-product small-product sale-product">
                                    <div className="image-container">
                                        <Link to="">
                                            <span className="image" style={{ backgroundImage: `url(${timesale5})` }}></span>
                                        </Link>
                                        <div className="percent">
                                            <span className="text"><strong>10</strong><small>%</small></span>
                                        </div>
                                        <div className="time">
                                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                                            <span className="text">21 : 32 : 46</span>
                                        </div>
                                    </div>
                                    <div className="info-container">
                                        <Link to="" className="name">
                                            <span>Шингэн кофе Американо No Brand</span>
                                        </Link>
                                        <Link to="" className="cat">
                                            <span>Лаазтай кофе латте</span>
                                        </Link>
                                        <Link to="" className="rating">
                                            <ul className="list-inline">
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item half-active">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </li>
                                                <li className="list-inline-item">
                                                    <span className="text">197</span>
                                                </li>
                                            </ul>
                                        </Link>
                                        <Link to="" className="price">
                                            <small className="sale">6,900₮</small>
                                            <span className="current">6,500₮</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="more-link text-center">
                            <Link to="" className="btn btn-border">
                                <span className="text text-uppercase">Хямдралтай бусад барааг үзэх</span>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Only eMart */}

                {/* Brand list */}
                <div className="main-slide brands-list">
                    <div className="container pad10">
                        <Slider dataSource={brands} params={brandsParams} elContainer={'brands'} />
                    </div>
                </div>
                {/* Brand list */}

                {/* Footer */}
                <div className="section section-footer">
                    <div className="container pad10">
                        <div className="row row10">
                            <div className="col-xl-3 pad10">
                                <Link to="" className="logo">
                                    <img alt="logo" src={IMAGE + staticinfo.logopath} />
                                </Link>
                                <ul className="list-unstyled address">
                                    <li>
                                        <span>
                                            <Icon type="facebook" />
                                        </span>
                                        <span>
                                            <Icon type="google-plus" />
                                        </span>
                                        <span>
                                            <Icon type="twitter" />
                                        </span>
                                    </li>
                                    {/* <li>
                                        <span>
                                        <Icon type="twitter" />
                                        </span>
                                    </li>
                                    <li>
                                        <span>
                                            <Icon type="google-plus" />
                                        </span>
                                    </li> */}
                                </ul>
                            </div>
                            <div className="col-xl-3 pad10">
                                <ul className="list-unstyled">
                                    <li>
                                        <strong>Бидний тухай</strong>
                                    </li>
                                    <li>
                                        <Link to="">
                                            <span>Үйлчилгээний нөхцөл</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="">
                                            <span>Нууцлалын баталгаа</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="">
                                            <span>Хүргэлтийн журам</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="">
                                            <span>Бараа буцаах солиулах нөхцөл</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-xl-3 pad10">
                                <ul className="list-unstyled">
                                    <li>
                                        <strong>Үйлчилгээний нөхцөл</strong>
                                    </li>
                                    <li>
                                        <Link to="">
                                            <span>Гишүүнчилэл</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="">
                                            <span>Худалдан авалт хийх заавар</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="">
                                            <span>Түгээмэл асуулт хариулт</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="">
                                            <span>Урамшуулал</span>
                                        </Link>
                                    </li>
                                </ul>                                
                            </div>
                            <div className="col-xl-3 pad10">
                                <ul className="list-unstyled address">
                                    <li>
                                        <strong>Холбоо барих</strong>
                                    </li>
                                    <li>
                                        <span>
                                            {staticinfo.address}
                                        </span>
                                    </li>
                                    <li>
                                        <span>
                                            {staticinfo.phone}
                                        </span>
                                    </li>
                                    <li>
                                        <span>
                                            {staticinfo.email}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="bottom-container">
                            <p>Copyright © 2016-2018 emart. All Rights Reserved.</p>
                        </div>
                    </div>
                </div>
                {/* Footer */}
                
                {/* Messenger */}
                <MessengerCustomerChat pageId="169275059877520" appId="570055533421847" htmlRef={window.location.pathname}/>
                {/* Messenger */}
            </div>
        );
    }
}

export default Dashboard;
