import React from "react";

import api from "../api";
import { compose } from "react-komposer";
import Loader from "../components/Loader";
import { UserProfile } from "../pages";

const options = {
  loadingHandler: () => <Loader />
};

const fetch = async (props, onData) => {
  try {
    onData(null, {
      container: {
        cityOrProvince: "",
        districtOrSum: ""
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
)(UserProfile);
