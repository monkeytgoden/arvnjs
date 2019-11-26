var NODE_ENV = process.env.NODE_ENV;

module.exports = {
  ENVIRONMENT: NODE_ENV === 'prod' || NODE_ENV === 'production' ? 'production' : 'development',
};
