import React from "react";
import moment from "moment";
import MessengerCustomerChat from "react-messenger-customer-chat";

import Slider from "../../components/Slider";
import Widget from "../../components/Widget";
import Banner from "../../components/Banner";
import { WIDGET_SLUGS } from "../../utils/consts";

class Homepage extends React.Component {
  getBlocks(widgets, items) {
    let blocks = [];

    widgets.forEach(widget => {
      switch (widget.slug) {
        case WIDGET_SLUGS.onlyemart:
          widget.items = items.prodsEmart;
          widget.readMore = "Бусад Имартын барааг үзэх";
          break;
        case WIDGET_SLUGS.discount:
          widget.items = items.prodsDiscount;
          widget.interval = (
            <span>
              {moment()
                .startOf("month")
                .format("MM/DD")}{" "}
              ~{" "}
              {moment()
                .endOf("month")
                .format("MM/DD")}
            </span>
          );
          widget.readMore = "Бусад хямдралтай барааг үзэх";
          break;
        case WIDGET_SLUGS.package:
          widget.items = items.prodsPackage;
          widget.readMore = "Бусад багцыг үзэх";
          break;
        case WIDGET_SLUGS.recipe:
          widget.items = items.recipes;
          widget.readMore = "Бусад хоолны жорыг үзэх";
          break;
        case WIDGET_SLUGS.new:
          widget.items = items.prodsNew;
          widget.readMore = "Бусад шинэ барааг үзэх";
          break;
        default:
      }

      if (widget.items.length > 0) {
        blocks.push(<Widget key={widget.slug} data={widget} />);
      }
    });

    return blocks;
  }

  renderBlocks(items) {
    const widgets = items.blocks.widgets.sort(
      (obj1, obj2) => obj1.orders - obj2.orders
    );

    let blocksToRender = [];

    blocksToRender.push(this.getBlocks(widgets.slice(0, 2), items.products));
    blocksToRender.push(
      <Banner
        key={items.blocks.banners[1][0].id}
        data={items.blocks.banners[1]}
      />
    );

    blocksToRender.push(this.getBlocks(widgets.slice(2, 4), items.products));
    blocksToRender.push(
      <Banner
        key={items.blocks.banners[2][0].id}
        data={items.blocks.banners[2]}
      />
    );

    return blocksToRender;
  }

  render() {
    const {
      categories,
      banners,
      tags,
      brands,
      widgets,
      prodsEmart,
      prodsDiscount,
      prodsPackage,
      prodsNew,
      recipes
    } = this.props.container;

    const items = {
      tags,
      products: {
        prodsEmart,
        prodsDiscount,
        prodsPackage,
        prodsNew,
        recipes
      },
      blocks: {
        widgets,
        banners
      }
    };

    const root = [];
    categories.forEach(entry => {
      if (entry.parentid === 0) {
        entry.children = [];
        root.push(entry);
      }
      root.forEach(ent => {
        if (ent.id === entry.parentid) {
          ent.children.push(entry);
        }
      });
    });

    const sliderParams = {
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true
      },
      spaceBetween: 0
    };

    const brandParams = {
      slidesPerView: 5,
      spaceBetween: 10,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      pagination: {
        type: "bullets",
        clickable: true
      }
    };

    return (
      <div className="top-container">
        {/* Slider */}
        <div className="main-slide">
          <Slider
            data={banners[0]}
            params={sliderParams}
            elContainer={"banner"}
          />
        </div>
        {/* Slider end */}

        {/* Main content */}
        {this.renderBlocks(items)}
        {/* Main content end */}

        {/* Brand list */}
        <div className="main-slide brands-list">
          <div className="container pad10">
            <Slider data={brands} params={brandParams} elContainer={"brands"} />
          </div>
        </div>
        {/* Brand list */}

        {/* Messenger */}
        <MessengerCustomerChat
          pageId="169275059877520"
          appId="570055533421847"
          htmlRef={window.location.pathname}
        />
        {/* Messenger */}
      </div>
    );
  }
}

export default Homepage;
