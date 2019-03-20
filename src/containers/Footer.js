import React from "react";

import api from "../api";
import { compose } from "react-komposer";
import Loader from "../components/Loader";
import { Footer } from "../layouts/index";

const options = {
  loadingHandler: () => <Loader />
};

const fetch = async (props, onData) => {
  try {
    const staticInfo = await api.staticInfo.findAll();
    const staticPage = await api.staticPage.findAll();

    onData(null, {
      container: {
        staticInfo: staticInfo.data[0],
        staticPage: staticPage.data
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
)(Footer);
