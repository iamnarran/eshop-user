import React from "react";
import { compose } from "react-komposer";
import { Spin } from "antd";

import api from "../api";
import { Checkout } from "../pages";

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
    const bankInfo = await api.checkout.findBankInfo({});
    const deliveryTypes = await api.checkout.findDeliveryTypes({});
    const paymentTypes = await api.checkout.findPaymentTypes({});
    onData(null, {
      container: {
        bankInfo: bankInfo.data,
        deliveryTypes: deliveryTypes.data,
        paymentTypes: paymentTypes.data
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
)(Checkout);
