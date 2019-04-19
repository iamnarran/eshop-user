import React from "react";
import { compose } from "react-komposer";
import { Spin } from "antd";

import api from "../../api";
import { PackageDetail } from "../../pages";

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
    const packageInfo = await api.packageInfo.findImf({
      id: props.match.params.id
    });
    const products = await api.packageInfo.findAllProducts({
      id: props.match.params.id
    });

    console.log("package", packageInfo);
    console.log("products", products);

    onData(null, {
      container: {
        packageInfo: packageInfo.data[0],
        products: products.data[0]
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
)(PackageDetail);
