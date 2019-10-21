(function(m) {
  m.exports = {};

  const ts = require('../utils/time');

  const HealthChecks = function({
    logger
  }) {
    let retr = {};

    retr.publicPing = (req, res) => {
      res.setHeader('Content-Type', 'application/json');

      return res.send({method: req.method, publicApi: "pong", time: ts.getTimeStamp() });
    };

    retr.publicLog = (req, res) => {
      res.setHeader('Content-Type', 'application/json');

      logger.log(`[${ts.getTimeStamp()}] HealthChecks::publicLog(): method: '${req.method}'`);

      return res.send({ method: req.method, publicApi: "pong", time: ts.getTimeStamp(), logged: true });
    };

    return retr;
  };

  m.exports = HealthChecks;
})(module);