const http = require('http');
const express = require("express");
const sensitive = require("../secrets/secrets.json");
const google_sensitive = require("../secrets/google_secrets.json");
sensitive.google = google_sensitive;
const settings = require("../settings.json");

const { registerMiddlewares } = require('./middlewares');
const SetupRouter = require('./routes');
const ts = require('./utils/time');

const publicListenPort = process.env.PORT || 8080;
const publicListenInterface = process.env.INTERFACE || "0.0.0.0";

const publicApi = express();

let logger = console;

objServer = http.createServer(publicApi);

logger.info(`Server started at: ${ts.getTimeStamp()}`);

registerMiddlewares({ publicApi }, logger);
logger.info("Common middleware hooks registered.");

const publicServerPromise = new Promise((resolve, reject) => {
  try {
    objServer.listen(publicListenPort, publicListenInterface, function () {
      resolve();
      logger.info(`Public REST API Listening on ${publicListenInterface}:${publicListenPort}`);
    });
  } catch (err) {
    reject();
    logger.error("Failed to create public API listener. ", err);
    process.exit(5);
  }
});

const router = SetupRouter({ publicApi, logger, sensitive, settings });
Promise.all([publicServerPromise]).then(() => {
  router.setupRoutes();
  logger.info(`\nServer ready (${ts.getTimeStamp()})`);
});


// Testing
// Google Spreadsheet
// const GoogleSpreadsheet = require('./services/googleSpreadsheet');
// const googleSpreadsheet = GoogleSpreadsheet({ sensitive });
// googleSpreadsheet.setupConnection().then(() => {
//   googleSpreadsheet.getSheetByName("Sheet1").then((info) => {
//     console.log("Spreadsheet Results: ", info);
//   });
// });

// // Weather API
// const Weather = require('./services/openWeatherMap');
// const weather = Weather({ sensitive });
// weather.getLatestWeather().then(({ res, body }) => {
//   console.log("Weather Results: ", body);
// });
