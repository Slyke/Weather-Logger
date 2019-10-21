const bodyParser = require('body-parser');

const registerBodyParser = (serverApp) => {
  serverApp.use(bodyParser.json());
};

module.exports = {
  registerBodyParser
};
