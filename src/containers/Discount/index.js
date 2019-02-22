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
    const products = await api.product.findAllDiscountProducts({ jumcd: "99" });
    const primaryBanners = await api.pagebanner.findAll({ type: "D1" });
    const secondaryBanners = await api.pagebanner.findAll({ type: "D2" });
    const menu = await api.menu.findOne({ slug: "discount" });

    onData(null, {
      container: {
        products: products.data,
        primaryBanners: primaryBanners.data,
        secondaryBanners: secondaryBanners.data,
        menu: menu.data
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
