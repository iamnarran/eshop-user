import React from "react";
import { compose } from "react-komposer";
import { Spin } from "antd";

import api from "../api";
import { CategoryInfo } from "../pages";

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
    const info = await api.categoryInfo.findAllInfo({
      id: props.match.params.id,
      orderCol: "price_asc"
    });

    console.log("ooo", info.data[0].parents);

    onData(null, {
      container: {
        id: props.match.params.id,
        products: info.data[0].products,
        parentCats: info.data[0].parents,
        subCats: info.data[0].SubCategorys,
        attributes: info.data[0].attributes
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
