import React, { Component } from "react";
import { connect } from "react-redux";
import NotificationBadge, { Effect } from "react-notification-badge";
import { Link } from "react-router-dom";
import { Icon } from "antd";

class CartButton extends Component {
  render() {
    const formatter = new Intl.NumberFormat("en-US");

    return (
      <Link to="/cart" className="row10">
        <NotificationBadge
          count={this.props.totalQty}
          effect={Effect.SCALE}
          style={{
            top: "-11px",
            right: "-11px"
          }}
        />
        <Icon type="shopping-cart" />
        <p>
          <small>Миний</small>
          <span className="text-uppercase">сагс</span>
        </p>
        <strong>{formatter.format(this.props.totalPrice)}₮</strong>
      </Link>
    );
  }
}

const mapStateToProps = state => {
  return {
    totalQty: state.cart.totalQtyInCart,
    totalPrice: state.cart.totalPriceInCart
  };
};

export default connect(mapStateToProps)(CartButton);
