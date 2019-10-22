(function(m) {
  m.exports = {};

  const Weather = require('../services/openWeatherMap');
  const GoogleSpreadsheet = require('../services/googleSpreadsheet');

  const { getTimeStamp, getYearMonth } = require('../utils/time');
  const { getRemoteIp, ipAllowed } = require('../utils/remoteIp');
  const { getRowHeaders, getRowHeaderIndex } = require('../utils/rowHeaders');

  const Controller = function({
    logger,
    sensitive,
    settings
  }) {
    let retr = {};

    const weather = Weather({ sensitive });
    const googleSpreadsheet = GoogleSpreadsheet({ sensitive });
    const googleSpreadsheetSetupPromise = googleSpreadsheet.setupConnection();

    retr.handleUpdate = (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      const reqIp = getRemoteIp(req);
      if (!ipAllowed(reqIp, settings.allowedIps)) {
        console.log(`Unauthorised update attempt from ${reqIp}`);
        res.status(401);
        return res.send({ method: req.method, time: getTimeStamp(), unauthorised: true });
      }

      googleSpreadsheetSetupPromise.then(() => {
        const sheetFound = googleSpreadsheet.addSheet(getYearMonth()).catch(() => {
          res.status(500);
          return res.send({ method: req.method, time: getTimeStamp(), error: "Unable to connect to google spreadsheets" });
        });

        const latestWeather = weather.getLatestWeather();
        const rowHeaders = getRowHeaders();

        Promise.all([sheetFound, latestWeather]).then((promiseResults) => {
          const sheet = promiseResults[0].sheet;
          const weatherResults = promiseResults[1];
          let weatherObject;

          try {
            weatherObject = JSON.parse(weatherResults.body);
          } catch (err) {
            logger.error("weatherObject.parse: ", err);
            res.status(500);
            return res.send({ method: req.method, time: getTimeStamp(), added: false, error: true });
          }
          try {
            const {
              meta,
              location,
              atmosphere
            } = req.body.payload;

            googleSpreadsheet.addRow(sheet.id, {
              "inside_stn_id": meta.stationId,
              "inside_stn_time": getTimeStamp(),
              "inside_stn_lat": location.latitude,
              "inside_stn_lon": location.longitude,
              "inside_stn_temp": atmosphere.temperature,
              "inside_stn_hum": atmosphere.humidity,
              "inside_stn_pres": atmosphere.pressure,
              "outside_stn_id": weatherObject.id,
              "outside_stn_time": weatherObject.dt,
              "outside_stn_lat": weatherObject.coord.lat,
              "outside_stn_lon": weatherObject.coord.lon,
              "outside_stn_temp": weatherObject.main.temp,
              "outside_stn_hum": weatherObject.main.humidity,
              "outside_stn_pres": weatherObject.main.pressure
            }).then(() => {
              return res.send({ method: req.method, time: getTimeStamp(), added: true });
            }).catch((addError) => {
              logger.error("googleSpreadsheet.addSheet: ", addError);
              res.status(500);
              return res.send({ method: req.method, time: getTimeStamp(), added: false, error: true });
            });
          } catch (err) {
            logger.error("addRow: ", err);
            res.status(500);
            return res.send({ method: req.method, time: getTimeStamp(), error: "Unable to connect to google spreadsheets" });
          }

        });
      }).catch(() => {
        res.status(500);
        return res.send({ method: req.method, time: getTimeStamp(), error: "Unable to connect to google spreadsheets" });
      });
    };

    return retr;
  };

  m.exports = Controller;
})(module);
