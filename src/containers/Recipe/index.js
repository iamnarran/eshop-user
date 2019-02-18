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
    const primaryBanners = await api.banner.findAll({ type: "F1" });
    const secondaryBanners = await api.banner.findAll({ type: "F2" });
    const tag = await api.tag.findAll({ slug: "recipe" });

    onData(null, {
      container: {
        products: products.data,
        primaryBanner: primaryBanners.data[0],
        secondaryBanners: secondaryBanners.data,
        tag: tag.data[0]
        // widget: widget.data.filter(i => {
        //   if (i.slug === "recipe") {
        //     return i;
        //   }
        //   return null;
        // }),
        // menu: menu.data.filter(i => {
        //   if (i.id === 72) {
        //     return i;
        //   }
        //   return null;
        // })
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
