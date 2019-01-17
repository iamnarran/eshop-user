const set = (name, data) =>
  window.localStorage.setItem(name, JSON.stringify(data));

const get = name => JSON.parse(window.localStorage.getItem(name));

const remove = name => {
  window.localStorage.removeItem(name);
};

const has = name => !!window.localStorage[name];

const setValue = (name, value) => {
  window.localStorage.setItem(name, value);
};

const getValue = name => window.localStorage.getItem(name);

export default {
  set,
  get,
  remove,
  has,
  setValue,
  getValue
};
