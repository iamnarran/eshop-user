import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import MessengerCustomerChat from 'react-messenger-customer-chat';
<<<<<<< HEAD
import Slider from '../components/Swiper';
import Widget from '../components/Widget';
import Banner from '../components/Banner';
//import config from '../config';
import timesale1 from '../scss/assets/images/demo/6.jpg';
import timesale2 from '../scss/assets/images/demo/7.jpg';
import timesale3 from '../scss/assets/images/demo/8.jpg';
import timesale4 from '../scss/assets/images/demo/9.jpg';
import timesale5 from '../scss/assets/images/demo/5.jpg';
import timesale6 from '../scss/assets/images/demo/11.jpg';
import timesale7 from '../scss/assets/images/demo/12.jpg';
=======

import Category from '../components/Category';
import MainMenu from '../components/Menu';
import Slider from '../components/Swiper';
import Widget from '../components/Widget';
import Banner from '../components/Banner';
import config from '../config';
import { WIDGET_TYPES, WIDGET_NAMES, BANNER_LOCATION_INDICES } from '../utils/consts';
>>>>>>> 91af03434f8696c5c648e7f6783e051476609cc9

/* const IMAGE =
    process.env.NODE_ENV === 'development'
        ? config.image.development
        : config.image.production; */

class Homepage extends Component {
    state = {
        isOpen: false,
    };

    toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

    handleChange(value) {
        console.log(`selected ${value}`);
    }

    renderWidgets(widgets, allItems) {
        let blocks = [];

        widgets = widgets.sort((obj1, obj2) => obj1.orders - obj2.orders);

        let itemsInWidget = [];
        widgets.forEach((widget, index) => {
<<<<<<< HEAD
            if (bannerIndices.includes(index)) {
                items.push(<Banner key={index}/>);
=======
            if (BANNER_LOCATION_INDICES.includes(index)) {
                // change "key" in the future
                blocks.push(<Banner key={index} />);
>>>>>>> 91af03434f8696c5c648e7f6783e051476609cc9
            }

            let type = WIDGET_TYPES.horizontal;
            switch (widget.name) {
                case WIDGET_NAMES.onlyEmart:
                    itemsInWidget = allItems.emartProducts;
                    break;
                case WIDGET_NAMES.discount:
                    itemsInWidget = allItems.discountProducts;
                    break;
                case WIDGET_NAMES.batch:
                    itemsInWidget = allItems.packageProducts;
                    break;
                case WIDGET_NAMES.recipe:
                    type = WIDGET_TYPES.vertical;
                    itemsInWidget = allItems.recipes;
                    break;
                default:
            }

            blocks.push(
                <Widget 
                    key={widget.slug}
                    type={type}
                    name={widget.name}
                    items={itemsInWidget} 
                    renderOrder={widget.type}
                />
            );
        });

        return blocks;
    }

    render() {
        const {
            //staticinfo,
            categories,
            banner,
            brands,
            //menus,
            widgets,
            emartProducts,
            discountProducts,
            packageProducts,
            recipes,
        } = this.props.container;

        const allItems = {
            emartProducts,
            discountProducts,
            packageProducts,
            recipes,
        };

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

        return (
            <div className="top-container" >
                {/* Slider */}
                <div className="main-slide">
                    <Slider dataSource={banner} params={homeBannerParams} elContainer={'banner'} />
                </div>
                {/* Slider end */}
                {/* Main content */}
                {this.renderWidgets(widgets, allItems)}
                {/* Main content end */}
                {/* Brand list */}
                <div className="main-slide brands-list">
                    <div className="container pad10">
                        <Slider dataSource={brands} params={brandsParams} elContainer={'brands'} />
                    </div>
                </div>
                {/* Brand list */}
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
                                            <span className="image" style={{ backgroundImage: `url(${timesale7})` }}></span>
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
                                            <span className="image" style={{ backgroundImage: `url(${timesale7})` }}></span>
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
                                            <span className="image" style={{ backgroundImage: `url(${timesale7})` }}></span>
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
                                            <span className="image" style={{ backgroundImage: `url(${timesale7})` }}></span>
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
                                            <span className="image" style={{ backgroundImage: `url(${timesale7})` }}></span>
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
                                            <span className="image" style={{ backgroundImage: `url(${timesale7})` }}></span>
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

                {/* Messenger */}
                {/* <MessengerCustomerChat pageId="169275059877520" appId="570055533421847" htmlRef={window.fndsmfpo.pathname}/> */}

                {/* Messenger */}
                <MessengerCustomerChat pageId="169275059877520" appId="570055533421847" htmlRef={window.location.pathname} />
                {/* Messenger */}
            </div>
        );
    }
}

export default Homepage;
