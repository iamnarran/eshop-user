import React from "react";
import { compose } from "react-komposer";
import { Spin } from "antd";

import api from "../api";
import { ResetPassword } from "../pages";

const options = {
  loadingHandler: () => (
    <div className="e-mart-loading">
      <Spin />
    </div>
  ),
  errorHandler: err => <p style={{ color: "red" }}>{err.message}</p>
};

const fetch = async (props, onData) => {
  const staticInfo = await api.staticInfo.findAll();
  try {
    onData(null, {
      container: {
        staticInfo: staticInfo.data[0]
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
)(ResetPassword);
