import config from 'config';

const API =
  process.env.NODE_ENV === 'development'
    ? config.api.development
    : config.api.production;
    
export default [
  {
    NAME: 'findAllRecipes',
    METHOD: 'GET',
    URL: `${API}/api/cookrecipe`,
    // REPLACE: 'jumcd',
  }
];