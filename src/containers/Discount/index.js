import React from "react";
import api from "../../api";
import { compose } from "react-komposer";
import Loader from "../../components/Loader";
import { Discount } from "../../pages";

const options = {
  loadingHandler: () => <Loader />
};

const fetch = async (props, onData) => {
  try {
    const discount = await api.product.findAllDiscountProducts({ jumcd: "99" });
    const mainbanner = await api.pagebanner.findAll({ type: "D1" });
    const subbanner = await api.pagebanner.findAll({ type: "D2" });
    const tag = await api.tag.findAll({ slug: "discount" });
    const menu = await api.menu.findAll();

    onData(null, {
      container: {
        saleproduct: discount.data,
        mainbanner: mainbanner.data[0],
        subbanner: subbanner.data,
        tag: tag.data[0],
        menu: menu.data.filter(i => {
          if (i.id === 70) {
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
)(Discount);
