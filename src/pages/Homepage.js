import React, { Component } from 'react';
import MessengerCustomerChat from 'react-messenger-customer-chat';

import Slider from '../components/Swiper';
import Widget from '../components/Widget';
import Banner from '../components/Banner';
import { WIDGET_TYPES, WIDGET_SLUGS } from '../utils/consts';

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
            if (index !== 0 && index % 2 === 0) {
                blocks.push(
                    <Banner 
                        key={allItems.banners[index].id} 
                        data={allItems.banners[index]}
                    />
                );
            }
            
            let type = WIDGET_TYPES.horizontal;
            let label = null;
            switch (widget.slug) {
                case WIDGET_SLUGS.onlyEmart:
                    itemsInWidget = allItems.emartProducts;
                    if (allItems.tags.emartProducts && allItems.tags.emartProducts) {
                        label = allItems.tags.emartProducts;
                    }
                    break;
                case WIDGET_SLUGS.discount:
                    itemsInWidget = allItems.discountProducts;
                    if (allItems.tags.discount && allItems.tags.discount) {
                        label = allItems.tags.discount;
                    }
                    break;
                case WIDGET_SLUGS.package:
                    itemsInWidget = allItems.packageProducts;
                    if (allItems.tags.package && allItems.tags.package) {
                        label = allItems.tags.package;
                    }
                    break;
                case WIDGET_SLUGS.recipe:
                    type = WIDGET_TYPES.vertical;
                    itemsInWidget = allItems.recipes;
                    if (allItems.tags.recipe && allItems.tags.recipe) {
                        label = allItems.tags.recipe;
                    }
                    break;
                default:
            }

            blocks.push(
                <Widget 
                    key={widget.slug}
                    type={type}
                    items={itemsInWidget} 
                    widget={widget}
                    label={label}
                />
            );
        });

        if (widgets.length % 2 === 0) {
            blocks.push(
                <Banner 
                    key={allItems.banners[widgets.length].id} 
                    data={allItems.banners[widgets.length]}
                />
            );
        }

        return blocks;
    }

    render() {
        const {
            //staticinfo,
            categories,
            banners,
            tags,
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
            banners,
            tags,
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
                    <Slider dataSource={banners[0]} params={homeBannerParams} elContainer={'banner'} />
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
