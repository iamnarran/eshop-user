import React from "react";
import { compose } from "react-komposer";
import { Spin } from "antd";

import api from "../api";
import { Homepage } from "../pages";

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
    const brands = await api.brand.findAll();
    const category = await api.category.findAll();
    const widget = await api.widget.findAll();
    const recipes = await api.recipe.findAll();
    const prodsPackage = await api.packageInfo.findAll();
    const prodsEmart = await api.product.findAllEmartProducts({
      jumcd: "99"
    });
    const prodsDiscount = await api.product.findAllDiscountProducts({
      jumcd: "99"
    });
    const prodsNew = await api.product.findAllNewProducts({
      jumcd: "99"
    });
    const mainBanners = await api.banner.findAll({ type: "A1" });
    const secondaryBanners = await api.banner.findAll({ type: "A2" });
    const ternaryBanners = await api.banner.findAll({ type: "A3" });

    const banners = [
      mainBanners.data,
      secondaryBanners.data,
      ternaryBanners.data
    ];

    onData(null, {
      container: {
        banners,
        widgets: widget.data,
        brands: brands.data,
        categories: category.data,
        recipes: recipes.data,
        prodsPackage: prodsPackage.data,
        prodsEmart: prodsEmart.data,
        prodsDiscount: prodsDiscount.data,
        prodsNew: prodsNew.data
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
)(Homepage);
