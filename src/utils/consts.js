const CARD_TYPES = {
  slim: 1,
  wide: 2,
  tile: 3,
};
Object.freeze(CARD_TYPES);

const CARD_NUMS_IN_COL = {
  wide: 3,
  slim: 5,
}
Object.freeze(CARD_NUMS_IN_COL);

const WIDGET_TYPES = {
  horizontal: 1,
  vertical: 2,
};
Object.freeze(WIDGET_TYPES);

const WIDGET_SLUGS = {
  onlyEmart: 'onlyemart',
  discount: 'discount',
  package: 'package',
  recipe: 'recipe',
};
Object.freeze(WIDGET_SLUGS);

let WIDGET_LABELS = {};
WIDGET_LABELS[WIDGET_SLUGS.onlyEmart] = [];
WIDGET_LABELS[WIDGET_SLUGS.discount] = ['percent', 'expiryDate', 'discountPrice'];
WIDGET_LABELS[WIDGET_SLUGS.package] = ['productCount'];
WIDGET_LABELS[WIDGET_SLUGS.recipe] = ['productCount'];
Object.freeze(WIDGET_LABELS);

export { 
  CARD_TYPES, 
  CARD_NUMS_IN_COL, 
  WIDGET_TYPES,
  WIDGET_SLUGS,
  WIDGET_LABELS, 
};
