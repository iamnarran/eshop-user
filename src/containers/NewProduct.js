import React from "react";
import { compose } from "react-komposer";
import { Spin } from "antd";

import api from "../api";
import { NewProduct } from "../pages";

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
    const products = await api.product.findAllNewProducts({ jumcd: "99" });
    const primaryBanners = await api.banner.findAll({ type: "F1" });
    const secondaryBanners = await api.banner.findAll({ type: "F2" });
    const menu = await api.menu.findOne({ slug: "new" });

    onData(null, {
      container: {
        products: products.data,
        primaryBanners: primaryBanners.data,
        secondaryBanners: secondaryBanners.data,
        menu: menu.data
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

export default compose(
  dataLoader,
  options
)(NewProduct);
