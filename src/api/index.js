import client, { setAuthorizationHeader } from './client';
import homepage from './Homepage';
import banner from './Banner';
import brand from './Brands';
import staticinfo from './Static';
import menu from './Menu';
import category from './Category';
import saleproduct from './Saleproduct';
import newproduct from './Newproduct';

let rest = {};

const generateURL = (method, url, replace, data) => {
  if (!replace) return url;
  let tmpURL = url;
  let tmp = replace.replace(/ /g, '').split(',');
  tmp.forEach(s => {
    tmpURL = tmpURL.replace(`:${s}`, data && data[s] ? data[s] : '');
  });
  return tmpURL;
};

const generateAPI = (api, data) => {
  let config = {
    method: api.METHOD,
    url: generateURL(api.METHOD, api.URL, api.REPLACE, data),
    headers: {
      'Content-Type': api.CONTENT_TYPE
        ? api.CONTENT_TYPE
        : 'application/json'
    }
  };
  config[api.METHOD === 'GET' ? 'params' : 'data'] = data;
  return client(config).then(res => res.data);
};

// HOMEPAGE
rest['homepage'] = {};
homepage.forEach(api => {
  rest.homepage[api.NAME] = data => generateAPI(api, data);
});

// BANNER
rest['banner'] = {};
banner.forEach(api => {
  rest.banner[api.NAME] = data => generateAPI(api, data);
});

// BRAND
rest['brand'] = {};
brand.forEach(api => {
  rest.brand[api.NAME] = data => generateAPI(api, data);
});

// STATIC INFO
rest['staticinfo'] = {};
staticinfo.forEach(api => {
  rest.staticinfo[api.NAME] = data => generateAPI(api, data);
});

// MENU
rest['menu'] = {};
menu.forEach(api => {
  rest.menu[api.NAME] = data => generateAPI(api, data);
});

// CATEGORY
rest['category'] = {};
category.forEach(api => {
  rest.category[api.NAME] = data => generateAPI(api, data);
});

//SALE PRODUCT
rest['saleproduct'] = {};
saleproduct.forEach(api => {
  rest.saleproduct[api.NAME] = data => generateAPI(api, data);
});

//NEW PRODUCT
rest['newproduct'] = {};
newproduct.forEach(api => {
  rest.newproduct[api.NAME] = data => generateAPI(api, data);
});

console.log('rest: ', rest);

export { rest as default, setAuthorizationHeader };
