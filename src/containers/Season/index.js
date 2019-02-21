import React from "react";

import api from "../../api";
import { compose } from "react-komposer";
import Loader from "../../components/Loader";
import { Season } from "../../pages";

const options = {
  loadingHandler: () => <Loader />
};

const fetch = async (props, onData) => {
  try {
    const menu = await api.menu.findAll();
    const primaryBanners = await api.banner.findAll({ type: "F1" });
    const products = await api.product.findAllSeasonProducts({ jumcd: "99" });
    const attributes = await api.product.findAllAttributes();
    const promoCats = await api.product.findAllPromoCats();

    onData(null, {
      container: {
        menu: menu.data,
        primaryBanners: primaryBanners.data,
        products: products.data,
        attributes: attributes.data,
        promoCats: promoCats.data
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
