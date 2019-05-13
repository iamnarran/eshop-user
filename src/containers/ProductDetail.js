import React from "react";
import { compose } from "react-komposer";
import { Spin } from "antd";

import api from "../api";
import { ProductDetail } from "../pages";

const options = {
  loadingHandler: () => (
    <div className="e-mart-loading">
      <Spin />
    </div>
  ),
  errorHandler: err => <p style={{ color: "red" }}>{err.message}</p>
};

const fetch = async (props, onData) => {
  const skucd = props.match.params.id;

  try {
    const categories = await api.category.findAll();
    const product = await api.product.productDetail({ skucd });
    const attributes = await api.product.productAttribute({ skucd });
    const similarProducts = await api.product.productCollection({ skucd });
    const relatedProducts = await api.product.productRelational({ skucd });
    const comments = await api.product.productComment({ skucd });

    console.log({product});

    onData(null, {
      container: {
        categories: categories.data,
        product: product.data[0].products[0],
        images: product.data[0].images,
        attributes: attributes.data,
        similarProducts: similarProducts.data,
        relatedProducts: relatedProducts.data,
        comments: comments.data
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
)(ProductDetail);
