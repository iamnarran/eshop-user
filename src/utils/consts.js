import config from "../config";

const API =
  process.env.NODE_ENV === "development"
    ? config.api.development
    : config.api.production;

const IMAGE =
  process.env.NODE_ENV === "development"
    ? config.image.development
    : config.image.production;

const CARD_TYPES = {
  slim: 1,
  wide: 2,
  tile: 3
};
Object.freeze(CARD_TYPES);

const CARD_NUMS_IN_COL = {
  wide: 3,
  slim: 5
};
Object.freeze(CARD_NUMS_IN_COL);

const CARD_LIST_TYPES = {
  horizontal: 1,
  vertical: 2
};
Object.freeze(CARD_LIST_TYPES);

const WIDGET_SLUGS = {
  onlyemart: "onlyemart",
  discount: "discount",
  recipe: "recipe",
  package: "package",
  new: "new"
};
Object.freeze(WIDGET_SLUGS);

// let WIDGET_LABELS = {};
// WIDGET_LABELS[WIDGET_SLUGS.onlyemart] = [];
// WIDGET_LABELS[WIDGET_SLUGS.discount] = [
//   "percent",
//   "expiryDate",
//   "discountPrice"
// ];
// WIDGET_LABELS[WIDGET_SLUGS.package] = ["productCount"];
// WIDGET_LABELS[WIDGET_SLUGS.recipe] = ["productCount"];
// WIDGET_LABELS[WIDGET_SLUGS.new] = ["new"];
// Object.freeze(WIDGET_LABELS);

export {
  API,
  IMAGE,
  CARD_TYPES,
  CARD_NUMS_IN_COL,
  CARD_LIST_TYPES,
  WIDGET_SLUGS
  // WIDGET_LABELS
};
