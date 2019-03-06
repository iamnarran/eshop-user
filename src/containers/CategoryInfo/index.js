import React from "react";
import { compose } from "react-komposer";
import api from "../../api";
import Loader from "../../components/Loader";
import { CategoryInfo } from "../../pages";
const options = {
  loadingHandler: () => <Loader />
};

const fetch = async (props, onData) => {
  try {
    const categoryProduct = await api.categoryInfo.findProducts({
      id: props.match.params.id
    });
    onData(null, {
      container: {
        categoryProduct: categoryProduct.data
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
