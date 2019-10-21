const { registerBodyParser } = require('./bodyParser.common');

const registerMiddlewares = ({ publicApi }, logger) => {
  registerBodyParser(publicApi);
  // registerCors(publicApi, logger);
};

module.exports = {
  registerMiddlewares
};
