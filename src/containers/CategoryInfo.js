import React from "react";
import { compose } from "react-komposer";
import { Spin } from "antd";

import api from "../api";
import { CategoryInfo } from "../pages";

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
    const info = await api.categoryInfo.findAllInfo({
      id: props.match.params.id,
      orderCol: "price_asc"
    });
    // const menu = await api.menu.findOne({ slug: "season" });
    // const primaryBanners = await api.pagebanner.findAll({ type: "H1" });

    onData(null, {
      container: {
        id: props.match.params.id,
        products: info.data[0].products,
        attributes: info.data[0].attributes
        // menu: menu.data,
        // primaryBanners: primaryBanners.data
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
)(CategoryInfo);
