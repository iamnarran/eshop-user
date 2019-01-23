const CARD_TYPES = {
  'wide': 1,
  'slim': 2,
};
Object.freeze(CARD_TYPES);

const CARD_NUMS_IN_COL = {
  'wide': 3,
  'slim': 5,
}
Object.freeze(CARD_NUMS_IN_COL);

const WIDGET_NAMES = {
  onlyEmart: 'Зөвхөн И-МАРТ дэлгүүрт',
  discount: 'Хямдралтай',
  batch: 'Багц бараа',
  recipe: 'Хоолны жор',
};
Object.freeze(WIDGET_NAMES);

let WIDGET_LABELS = {};
WIDGET_LABELS[WIDGET_NAMES.onlyEmart] = [];
WIDGET_LABELS[WIDGET_NAMES.discount] = ['percent', 'expiryDate', 'discountPrice'];
WIDGET_LABELS[WIDGET_NAMES.batch] = ['productCount'];
WIDGET_LABELS[WIDGET_NAMES.recipe] = ['productCount'];
Object.freeze(WIDGET_LABELS);

const BANNER_LOCATION_INDICES = [2, 4];
Object.freeze(BANNER_LOCATION_INDICES);

export { 
  CARD_TYPES, 
  CARD_NUMS_IN_COL, 
  WIDGET_NAMES,
  WIDGET_LABELS, 
  BANNER_LOCATION_INDICES,
};
