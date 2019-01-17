export default key => {
  const queries = window.location.href
    .split('?')
    .pop()
    .split('&');

  const params = {};
  queries.forEach(query => {
    const set = query.split('=');
    params[set[0]] = set[1];
  });

  if (key) {
    return decodeURI(params[key]) || null;
  } else {
    return params;
  }
};
