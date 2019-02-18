import React from "react";

import api from "../../api";
import { compose } from "react-komposer";
import Loader from "../../components/Loader";
import { NewProduct } from "../../pages";

const options = {
  loadingHandler: () => <Loader />
};

const fetch = async (props, onData) => {
  try {
    const newproduct = await api.product.findAllNewProducts({ jumcd: "99" });
    const mainbanner = await api.pagebanner.findAll({ type: "F1" });
    const subbanner = await api.pagebanner.findAll({ type: "F2" });
    const tag = await api.tag.findAll({ slug: "new" });
    const menu = await api.menu.findAll();
    onData(null, {
      container: {
        newproduct: newproduct.data,
        mainbanner:
          mainbanner.data[Math.floor(Math.random() * subbanner.data.length)],
        subbanner: subbanner.data,
        tag: tag.data[0],
        menu: menu.data.filter(i => {
          if (i.id === 75) {
            return i;
          }
          return null;
        })
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
)(NewProduct);
