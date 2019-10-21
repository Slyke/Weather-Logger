(function(m) {
  m.exports = {};

  const ts = require('./utils/time').default;
  const DataRecorder = require('./controllers/DataRecorder');
  const HealthChecks = require('./controllers/HealthChecks');

  const Routes = function({
    settings,
    sensitive,
    logger,
    publicApi
  }) {
    let retr = {};

    const dataRecorder = DataRecorder({ logger, sensitive, settings });
    const healthChecks = HealthChecks({ logger });

    const setupPublicRoutes = () => {
      publicApi.all('/', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        return res.send({ name: "Weather Logger" });
      });

      publicApi.get('/ping', healthChecks.publicPing);

      publicApi.post('/update', dataRecorder.handleUpdate);

      logger.info("Public routes setup.");
    };

    retr.setupRoutes = () => {
      setupPublicRoutes();
    };

    return retr;
  };

  m.exports = Routes;
})(module);