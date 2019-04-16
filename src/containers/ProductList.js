import React from "react";
import { compose } from "react-komposer";
import { Spin } from "antd";

import api from "../api";
import { ProductList } from "../pages";

const options = {
  loadingHandler: () => (
    <div className="e-mart-loading">
      <Spin />
    </div>
  ),
  errorHandler: err => <p style={{ color: "red" }}>{err.message}</p>
};

const fetch = async (props, onData) => {
  let products = [];
  let attributes = [];
  try {
    if (props.match.params.id) {
      products = await api.search.findProductBrand({
        brandid: props.match.params.id
      });
    } else {
      const data = {
        ismart: 1
      };
      products = await api.product.findAllEmartProducts({
        jumcd: "99"
      });
      attributes = await api.product.emartAtt(data);
    }
    onData(null, {
      container: {
        products: products.data,
        attributes: attributes.data
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
)(ProductList);
