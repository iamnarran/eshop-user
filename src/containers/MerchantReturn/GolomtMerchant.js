import React from "react";
import { compose } from "react-komposer";
import { Spin } from "antd";

import api from "../../api";
import { GolomtMerchant } from "../../pages";

const options = {
  loadingHandler: () => (
    <div className="e-mart-loading">
      <Spin />
    </div>
  ),
  errorHandler: err => <p style={{ color: "red" }}>{err.message}</p>
};

const fetch = async (props, onData) => {
  let tmp = {
    trans_number: getUrlParams(props, "trans_number"),
    success: getUrlParams(props, "success"),
    error_code: getUrlParams(props, "error_code"),
    error_desc: getUrlParams(props, "error_desc"),
    card_number: getUrlParams(props, "card_number"),
    signature: getUrlParams(props, "signature")
  };
  const data = await api.golomtMerchant.getGolomtMerchant(tmp);
  try {
    onData(null, {
      container: {
        data: data
      }
    });
  } catch (e) {
    console.log("CUSTOM ERROR: ");
    console.log(e);
  }
};

function getUrlParams(props, name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(props.location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

const dataLoader = (props, onData) => {
  fetch(props, onData);
};

export default compose(
  dataLoader,
  options
)(GolomtMerchant);
