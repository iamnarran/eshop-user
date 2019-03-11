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
    const packageProduct = await api.packageProduct.findProducts({
      id: props.match.params.id
    });
    const packageName = await api.packageProduct.findImf({
      id: props.match.params.id
    });
    onData(null, {
      container: {
        Products: packageProduct.data,
        Package: packageName.data[0]
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
