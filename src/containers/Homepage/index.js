import React from "react";
import api from "../../api";
import { compose } from "react-komposer";
import { Homepage } from "../../pages";
import Loader from "../../components/Loader";

const options = {
  loadingHandler: () => <Loader />,
  errorHandler: err => <p style={{ color: "red" }}>{err.message}</p>
};

const fetch = async (props, onData) => {
  try {
    const brands = await api.brand.findAll();
    const category = await api.category.findAll();
    const widget = await api.widget.findAll();
    const recipes = await api.recipe.findAll();
    const prodsPackage = await api.packageProduct.findAll();
    const prodsEmart = await api.product.findAllEmartProducts({
      jumcd: "99"
    });
    const prodsDiscount = await api.product.findAllDiscountProducts({
      jumcd: "99"
    });
    const prodsNew = await api.product.findAllNewProducts({
      jumcd: "99"
    });
    const banners1 = await api.banner.findAll({ type: "A1" });
    const banners2 = await api.banner.findAll({ type: "A2" });
    const banners3 = await api.banner.findAll({ type: "A3" });
    // const tagsRecipe = await api.tag.findAll({ slug: "recipe" });
    // const tagsDiscount = await api.tag.findAll({ slug: "discount" });
    // const tagsPackage = await api.tag.findAll({ slug: "package" });

    const banners = [];
    banners[0] = banners1.data;
    banners[2] = banners2.data;
    banners[4] = banners3.data;

    // const tags = [];
    // tags["recipe"] = tagsRecipe.data[0];
    // tags["discount"] = tagsDiscount.data[0];
    // tags["package"] = tagsPackage.data[0];

    onData(null, {
      container: {
        banners,
        // tags,
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
