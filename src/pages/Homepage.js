import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import MessengerCustomerChat from 'react-messenger-customer-chat';

//import config from '../config';
import timesale1 from '../scss/assets/images/demo/6.jpg';
import timesale2 from '../scss/assets/images/demo/7.jpg';
import timesale3 from '../scss/assets/images/demo/8.jpg';
import timesale4 from '../scss/assets/images/demo/9.jpg';
import timesale5 from '../scss/assets/images/demo/5.jpg';
import timesale6 from '../scss/assets/images/demo/11.jpg';
import timesale7 from '../scss/assets/images/demo/12.jpg';

import Category from '../components/Category';
import MainMenu from '../components/Menu';
import Slider from '../components/Swiper';
import Widget from '../components/Widget';
import Banner from '../components/Banner';
import config from '../config';
import { WIDGET_TYPES, WIDGET_SLUGS, BANNER_LOCATION_INDICES } from '../utils/consts';

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
            if (BANNER_LOCATION_INDICES.includes(index)) {
                // change "key" in the future
                blocks.push(<Banner key={index} />);
            }

            let type = WIDGET_TYPES.horizontal;
            switch (widget.slug) {
                case WIDGET_SLUGS.onlyEmart:
                    itemsInWidget = allItems.emartProducts;
                    break;
                case WIDGET_SLUGS.discount:
                    itemsInWidget = allItems.discountProducts;
                    break;
                case WIDGET_SLUGS.package:
                    itemsInWidget = allItems.packageProducts;
                    break;
                case WIDGET_SLUGS.recipe:
                    type = WIDGET_TYPES.vertical;
                    itemsInWidget = allItems.recipes;
                    break;
                default:
            }

            blocks.push(
                <Widget 
                    key={widget.slug}
                    type={type}
                    items={itemsInWidget} 
                    widget={widget}
                />
            );
        });

        return blocks;
    }

    render() {
        const {
            //staticinfo,
            categories,
            banners,
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
                    <Slider dataSource={banners} params={homeBannerParams} elContainer={'banner'} />
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
                
                {/* Messenger */}
                <MessengerCustomerChat pageId="169275059877520" appId="570055533421847" htmlRef={window.location.pathname} />
                {/* Messenger */}
            </div>
        );
    }
}

export default Homepage;
