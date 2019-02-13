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
    const recipeproduct = await api.recipe.findAll();
    const mainbanner = await api.pagebanner.findAll({ type: "F1" });
    const subbanner = await api.pagebanner.findAll({ type: "F2" });
    const tag = await api.tag.findAll({ type: "recipe" });
    const menu = await api.menu.findAll();
    const widget = await api.widget.findAll();
    // console.log(menu);

    onData(null, {
      container: {
        recipeproduct: recipeproduct.data,
        mainbanner: mainbanner.data[0],
        subbanner: subbanner.data[0],
        tag: tag.data[0],
        widget: widget.data.filter(i => {
          if (i.slug === "recipe") {
            return i;
          }
          return null;
        }),
        menu: menu.data.filter(i => {
          if (i.id === 72) {
            return i;
          }
          return null;
        })
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
