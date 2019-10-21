(function(m) {
  m.exports = {};

  const ts = require('../utils/time');
  const request = require('request');

  const OpenWeatherMapService = function({
    sensitive,
    logger
  }) {
    let retr = {};

    const apiKey = process.env.openWeatherMapApiKey || sensitive.apiKeys.openWeatherMap;

    retr.getLatestWeather = (location = "default", checkEnvVar = true) => {
      let latitude = process.env.openWeatherMapLatitude || sensitive.locations[location].lat;
      let longitude = process.env.openWeatherMapLongitude || sensitive.locations[location].lon;

      if (!checkEnvVar) {
        latitude = sensitive.locations[location].lat;
        longitude = sensitive.locations[location].lon;
      }

      return new Promise((resolve, reject) => {
        request.post(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`,
        (error, res, body) => {
          if (error) {
            reject(error);
            return
          }
          resolve({ res, body });
        });
      });
    };

    return retr;
  };

  m.exports = OpenWeatherMapService;
})(module);
