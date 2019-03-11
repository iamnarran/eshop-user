import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "antd";
import PropTypes from "prop-types";

import { CARD_LIST_TYPES, WIDGET_SLUGS } from "../utils/consts";
import CardList from "./CardList";

import "./Widget.css";

class Widget extends React.Component {
  render() {
    const { data } = this.props;

    if (!data) {
      return null;
    }

    let subtitle = null;
    if (data.subtitle) {
      subtitle = (
        <p className="text">
          <Icon type="clock-circle" /> {data.subtitle}
        </p>
      );
    }

    let cardList = null;
    if (data.slug === WIDGET_SLUGS.recipe) {
      cardList = (
        <CardList
          type={CARD_LIST_TYPES.vertical}
          items={data.items}
          cardsInCol={2}
        />
      );
    } else {
      cardList = (
        <CardList
          type={CARD_LIST_TYPES.horizontal}
          items={data.items}
          seq={data.type}
        />
      );
    }

    return (
      <div className="section">
        <div className="container pad10">
          <h1 className="title">
            <span className="text-uppercase">{data.name}</span>
            {subtitle}
            {data.interval ? data.interval : ""}
          </h1>

          {cardList}

          <div className="more-link text-center">
            <Link to={data.link ? data.link : ""} className="btn btn-border">
              <span className="text text-uppercase">{data.readMore}</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

Widget.propTypes = {
  data: PropTypes.object.isRequired
};

export default Widget;
