import React from "react";
import { compose } from "react-komposer";

import api from "../api";
import { Header } from "../layouts/index";

const options = {
  errorHandler: err => <p style={{ color: "red" }}>{err.message}</p>
};

const fetch = async (props, onData) => {
  try {
    const staticInfo = await api.staticInfo.findAll();
    const menu = await api.menu.findAll();
    const categories = await api.category.findAll();

    onData(null, {
      container: {
        staticInfo: staticInfo.data[0],
        menu: menu.data,
        categories: categories.data
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
)(Header);
