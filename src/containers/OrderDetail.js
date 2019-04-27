import React from "react";
import { compose } from "react-komposer";

import api from "../api";
import { OrderDetail } from "../pages";

const options = {
  errorHandler: err => <p style={{ color: "red" }}>{err.message}</p>
};

const fetch = async (props, onData) => {
  try {
    const data = await api.customer.getOrderDetail({
      ordid: props.match.params.id
    });

    onData(null, {
      container: {
        data: data.data
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
)(OrderDetail);
