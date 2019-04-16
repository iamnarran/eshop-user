const has = name => {
  return localStorage.getItem(name) !== null;
};

const set = (name, data) => {
  localStorage.setItem(name, JSON.stringify(data));
};

const get = name => {
  return JSON.parse(localStorage.getItem(name));
};

const remove = name => {
  localStorage.removeItem(name);
};

export default {
  has,
  set,
  get,
  remove
};
