import React from "react";
import api from "../../api";
import { compose } from "react-komposer";
import { StaticPage } from "../../pages";
import Loader from "../../components/Loader";

const options = {
  loadingHandler: () => <Loader />,
  errorHandler: err => <p style={{ color: "red" }}>{err.message}</p>
};

const fetch = async (props, onData) => {
  try {
    const staticPages = await api.staticPages.findPage({
      id: props.match.params.id
    });
    onData(null, {
      container: {
        staticPages: staticPages.data[0]
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
)(StaticPage);
