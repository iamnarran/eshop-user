import React from "react";
import { compose } from "react-komposer";
import { Spin } from "antd";

import api from "../api";
import { Season } from "../pages";

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
    const menu = await api.menu.findOne({ slug: "season" });
    const primaryBanners = await api.banner.findAll({ type: "H1" });
    const info = await api.season.findAllFilteredInfo({
      promotid: null,
      parameters: [],
      minprice: 0,
      maxprice: 0,
      ordercol: "price_asc"
    });
    console.log("info", info);
    onData(null, {
      container: {
        id: props.match.params.id || null,
        menu: menu.data,
        primaryBanners: primaryBanners.data,
        products: info.data[0].products,
        attributes: info.data[0].attributes,
        promoCats: info.data[0].promotions
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
)(Season);
