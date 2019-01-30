import config from 'config';

const API =
  process.env.NODE_ENV === 'development'
    ? config.api.development
    : config.api.production;
    
export default [
  {
    NAME: 'findAll',
    METHOD: 'GET',
    URL: `${API}/api/tag/:type`,
    REPLACE: 'id, type',
  }
];
