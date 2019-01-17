export default translations => {
  let defaultLang = '';

  translations.forEach(t => {
    if (t.defaultStatus === 'default') {
      defaultLang = t;
    }
  });

  return defaultLang
    ? defaultLang
    : translations.length > 0
    ? translations[0]
    : null;
};
