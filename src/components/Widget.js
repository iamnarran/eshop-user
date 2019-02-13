import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "antd";
import PropTypes from "prop-types";

import { CARD_LIST_TYPES, WIDGET_SLUGS } from "../utils/consts";
import CardList from "./CardList";

import "./Widget.css";

class Widget extends React.Component {
  state = {
    data: null
  };

  componentDidMount() {
    this.setState({ ...this.props });
  }

  render() {
    if (!this.state.data) {
      return null;
    }

    let subtitle = null;
    if (this.state.data.subtitle) {
      subtitle = (
        <p className="text">
          <Icon type="clock-circle" /> {this.state.data.subtitle}
        </p>
      );
    }

    return (
      <div className="section">
        <div className="container pad10">
          <h1 className="title">
            <span className="text-uppercase">{this.state.data.name}</span>
            {subtitle}
            {this.state.data.interval ? this.state.data.interval : ""}
          </h1>

          <CardList
            type={
              this.state.data.slug === WIDGET_SLUGS.recipe
                ? CARD_LIST_TYPES.vertical
                : CARD_LIST_TYPES.horizontal
            }
            seq={this.state.data.type}
            cardsInCol={2}
            items={this.state.data.items}
          />

          <div className="more-link text-center">
            <Link
              to={this.state.data.link ? this.state.data.link : ""}
              className="btn btn-border"
            >
              <span className="text text-uppercase">
                {this.state.data.readMore}
              </span>
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
