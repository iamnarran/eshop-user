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
  tile: 3,
  list: 4
};
Object.freeze(CARD_TYPES);

const CARD_NUMS_IN_ROW = {
  wide: 3,
  slim: 5
};
Object.freeze(CARD_NUMS_IN_ROW);

const CARD_LIST_TYPES = {
  horizontal: 1,
  vertical: 2,
  list: 3
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

const LABEL_TYPES = {
  horizontal: 1,
  vertical: 2
};
Object.freeze(CARD_LIST_TYPES);

const SOCIAL_IDS = {
  google:
    "385681945952-cuekq38feemk8gk2elbtctbpanregnnj.apps.googleusercontent.com",
  facebook: "2202198193174497"
};
Object.freeze(SOCIAL_IDS);

export {
  API,
  IMAGE,
  CARD_TYPES,
  CARD_NUMS_IN_ROW,
  CARD_LIST_TYPES,
  WIDGET_SLUGS,
  LABEL_TYPES,
  SOCIAL_IDS
};
