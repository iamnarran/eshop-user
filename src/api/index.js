import client, { setAuthorizationHeader } from "./client";
import homepage from "./homepage";
import homepageBanner from "./Banner/homepageBanner";
import banner from "./Banner/banner";
import brand from "./brand";
import staticInfo from "./staticInfo";
import menu from "./menu";
import category from "./category";
import widget from "./widget";
import product from "./product";
import recipe from "./recipe";
import packageInfo from "./packageInfo";
import tag from "./tag";
import location from "./location";
import login from "./User/login";
import register from "./User/register";
import staticPage from "./staticPage";
import categoryInfo from "./categoryInfo";
import season from "./season";
import cart from "./cart";
import checkout from "./checkout";
import wishList from "./wishlist";
import viewList from "./viewlist";

let rest = {};

const generateURL = (method, url, replace, data) => {
  if (!replace) return url;
  let tmpURL = url;
  let tmp = replace.replace(/ /g, "").split(",");
  tmp.forEach(s => {
    tmpURL = tmpURL.replace(`:${s}`, data && data[s] ? data[s] : "");
  });
  return tmpURL;
};

const generateAPI = (api, data) => {
  let config = {
    method: api.METHOD,
    url: generateURL(api.METHOD, api.URL, api.REPLACE, data),
    headers: {
      "Content-Type": api.CONTENT_TYPE ? api.CONTENT_TYPE : "application/json"
    }
  };
  config[api.METHOD === "GET" ? "params" : "data"] = data;
  return client(config).then(res => res.data);
};

rest["homepage"] = {};
homepage.forEach(api => {
  rest.homepage[api.NAME] = data => generateAPI(api, data);
});

rest["homepageBanner"] = {};
homepageBanner.forEach(api => {
  rest.homepageBanner[api.NAME] = data => generateAPI(api, data);
});

rest["brand"] = {};
brand.forEach(api => {
  rest.brand[api.NAME] = data => generateAPI(api, data);
});

rest["staticInfo"] = {};
staticInfo.forEach(api => {
  rest.staticInfo[api.NAME] = data => generateAPI(api, data);
});

rest["menu"] = {};
menu.forEach(api => {
  rest.menu[api.NAME] = data => generateAPI(api, data);
});

rest["category"] = {};
category.forEach(api => {
  rest.category[api.NAME] = data => generateAPI(api, data);
});

rest["widget"] = {};
widget.forEach(api => {
  rest.widget[api.NAME] = data => generateAPI(api, data);
});

rest["product"] = {};
product.forEach(api => {
  rest.product[api.NAME] = data => generateAPI(api, data);
});

rest["recipe"] = {};
recipe.forEach(api => {
  rest.recipe[api.NAME] = data => generateAPI(api, data);
});

rest["packageInfo"] = {};
packageInfo.forEach(api => {
  rest.packageInfo[api.NAME] = data => generateAPI(api, data);
});

rest["banner"] = {};
banner.forEach(api => {
  rest.banner[api.NAME] = data => generateAPI(api, data);
});

rest["tag"] = {};
tag.forEach(api => {
  rest.tag[api.NAME] = data => generateAPI(api, data);
});

rest["location"] = {};
location.forEach(api => {
  rest.location[api.NAME] = data => generateAPI(api, data);
});

rest["login"] = {};
login.forEach(api => {
  rest.login[api.NAME] = data => generateAPI(api, data);
});

rest["register"] = {};
register.forEach(api => {
  rest.register[api.NAME] = data => generateAPI(api, data);
});

rest["staticPage"] = {};
staticPage.forEach(api => {
  rest.staticPage[api.NAME] = data => generateAPI(api, data);
});

rest["categoryInfo"] = {};
categoryInfo.forEach(api => {
  rest.categoryInfo[api.NAME] = data => generateAPI(api, data);
});

rest["season"] = {};
season.forEach(api => {
  rest.season[api.NAME] = data => generateAPI(api, data);
});

rest["cart"] = {};
cart.forEach(api => {
  rest.cart[api.NAME] = data => generateAPI(api, data);
});

rest["checkout"] = {};
checkout.forEach(api => {
  rest.checkout[api.NAME] = data => generateAPI(api, data);
});

rest["wishList"] = {};
wishList.forEach(api => {
  rest.wishList[api.NAME] = data => generateAPI(api, data);
});

rest["viewList"] = {};
viewList.forEach(api => {
  rest.viewList[api.NAME] = data => generateAPI(api, data);
});

export { rest as default, setAuthorizationHeader };
