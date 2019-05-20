import React from "react";
import { compose } from "react-komposer";
import { Spin } from "antd";

import api from "../../api";
import { RecipeDetail } from "../../pages";

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
    const recipe = await api.recipe.findOne({ id: props.match.params.id });
    const products = await api.recipe.findAllProducts({
      id: props.match.params.id
    });

    onData(null, {
      container: {
        recipe: recipe.data[0].recipe,
        steps: recipe.data[0].steps,
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
