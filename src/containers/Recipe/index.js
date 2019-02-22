import React from "react";

import api from "../../api";
import { compose } from "react-komposer";
import Loader from "../../components/Loader";
import { Recipe } from "../../pages";

const options = {
  loadingHandler: () => <Loader />
};

const fetch = async (props, onData) => {
  try {
    const products = await api.recipe.findAll();
    const primaryBanners = await api.banner.findAll({ type: "E1" });
    const secondaryBanners = await api.banner.findAll({ type: "E2" });
    const menu = await api.menu.findOne({ slug: "recipe" });

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
)(Recipe);
