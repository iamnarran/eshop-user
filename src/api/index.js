import client, { setAuthorizationHeader } from "./Client/index";
import homepage from "./Homepage/index";
import banner from "./Banner/HompageBanner";
import brand from "./Brand/index";
import staticinfo from "./Static/index";
import menu from "./Menu/index";
import category from "./Category/index";
import widget from "./Widget/index";
import product from "./Product/index";
import recipe from "./Recipe/index";
import packageProduct from "./Package/index";
import pagebanner from "./Banner/PagesBanner";
import tag from "./Tag/index";
import location from "./Location";
import login from "./User/login";
import register from "./User/register";
import staticPages from "./StaticPages";
import categoryInfo from "./CategoryInfo";

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

// HOMEPAGE
rest["homepage"] = {};
homepage.forEach(api => {
  rest.homepage[api.NAME] = data => generateAPI(api, data);
});

// BANNER
rest["banner"] = {};
banner.forEach(api => {
  rest.banner[api.NAME] = data => generateAPI(api, data);
});

// BRAND
rest["brand"] = {};
brand.forEach(api => {
  rest.brand[api.NAME] = data => generateAPI(api, data);
});

// STATIC INFO
rest["staticinfo"] = {};
staticinfo.forEach(api => {
  rest.staticinfo[api.NAME] = data => generateAPI(api, data);
});

// MENU
rest["menu"] = {};
menu.forEach(api => {
  rest.menu[api.NAME] = data => generateAPI(api, data);
});

// CATEGORY
rest["category"] = {};
category.forEach(api => {
  rest.category[api.NAME] = data => generateAPI(api, data);
});

// WIDGET
rest["widget"] = {};
widget.forEach(api => {
  rest.widget[api.NAME] = data => generateAPI(api, data);
});

// PRODUCT
rest["product"] = {};
product.forEach(api => {
  rest.product[api.NAME] = data => generateAPI(api, data);
});

// RECIPE
rest["recipe"] = {};
recipe.forEach(api => {
  rest.recipe[api.NAME] = data => generateAPI(api, data);
});

// PACKAGE
rest["packageProduct"] = {};
packageProduct.forEach(api => {
  rest.packageProduct[api.NAME] = data => generateAPI(api, data);
});

//PAGE'S BANNER
rest["pagebanner"] = {};
pagebanner.forEach(api => {
  rest.pagebanner[api.NAME] = data => generateAPI(api, data);
});

//TAG
rest["tag"] = {};
tag.forEach(api => {
  rest.tag[api.NAME] = data => generateAPI(api, data);
});

//SYSTEM lOCATION
rest["location"] = {};
location.forEach(api => {
  rest.location[api.NAME] = data => generateAPI(api, data);
});

//LOGIN
rest["login"] = {};
login.forEach(api => {
  rest.login[api.NAME] = data => generateAPI(api, data);
});

//REGISTER
rest["register"] = {};
register.forEach(api => {
  rest.register[api.NAME] = data => generateAPI(api, data);
//STATIC PAGE
rest["staticPages"] = {};
staticPages.forEach(api => {
  rest.staticPages[api.NAME] = data => generateAPI(api, data);
});

//CATEGORY PRODUCT
rest["categoryInfo"] = {};
categoryInfo.forEach(api => {
  rest.categoryInfo[api.NAME] = data => generateAPI(api, data);
});

export { rest as default, setAuthorizationHeader };
