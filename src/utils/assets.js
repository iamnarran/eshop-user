import config from "config";

const IMAGE =
  process.env.NODE_ENV === "development"
    ? config.image.development
    : config.image.production;

const get = tmpAssets => {
  let assets = JSON.parse(JSON.stringify(tmpAssets));
  let tmp = null;

  assets.forEach((a, i) => {
    if (a.assetIsMain && a.assetType === "image") {
      a.assetSrc = IMAGE + a.assetSrc;
      tmp = a;
    } else if (i === 0) {
      a.assetSrc = IMAGE + a.assetSrc;
      tmp = a;
    }
  });

  return tmp;
};

const all = assets => {
  let tmp = JSON.parse(JSON.stringify(assets));

  tmp.forEach((a, i) => {
    tmp[i].assetSrc = IMAGE + a.assetSrc;
  });

  return tmp;
};

export default { get, all };
