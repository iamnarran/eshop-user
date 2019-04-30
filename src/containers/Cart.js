import React from "react";
import { connect } from "react-redux";
import { compose } from "react-komposer";
import { Spin } from "antd";

import { Cart } from "../pages";
import api from "../api";

const options = {
  loadingHandler: () => (
    <div className="e-mart-loading">
      <Spin />
    </div>
  ),
  errorHandler: err => <p style={{ color: "red" }}>{err.message}</p>
};

const fetch = async (props, onData) => {
  try {
    const { isLoggedIn, user } = props;
    let wishlistProducts = [];
    if (isLoggedIn && user) {
      wishlistProducts = await api.customer.getWishList(user.id);
    }

    const staticInfo = await api.staticInfo.findAll();

    onData(null, {
      container: {
        wishlistProducts: wishlistProducts.data,
        deliveryInfo: staticInfo.data[0].deliverytxt
      }
    });
  } catch (e) {
    console.log("CUSTOM ERROR: ");
    console.log(e);
  }
};

const dataLoader = (props, onData) => {
  fetch(props, onData);
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(
  compose(
    dataLoader,
    options
  )(Cart)
);
