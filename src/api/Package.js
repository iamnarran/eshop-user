import config from 'config';

const API =
  process.env.NODE_ENV === 'development'
    ? config.api.development
    : config.api.production;
    
export default [
  {
    NAME: 'findAllPackageProducts',
    METHOD: 'GET',
    URL: `${API}/api/package`,
    // REPLACE: 'jumcd',
  }
];