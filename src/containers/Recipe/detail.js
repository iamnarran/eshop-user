import React from "react";
import { compose } from "react-komposer";

import api from "../../api";
import Loader from "../../components/Loader";
import { RecipeDetail } from "../../pages";

const options = {
  loadingHandler: () => <Loader />
};

const fetch = async (props, onData) => {
  try {
    const recipe = await api.recipe.findOne({ id: props.match.params.id });
    const products = await api.recipe.findAllProducts({
      id: props.match.params.id
    });

    console.log(products);

    onData(null, {
      container: {
        recipe: recipe.data,
        productsData: products.data[0]
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
)(RecipeDetail);
