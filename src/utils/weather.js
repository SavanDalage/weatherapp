const request = require("request");

const weatherReport = function (latitude, longitude, callback) {
  const url =
    "http://api.weatherstack.com/current?access_key=c7d27b39ef54b28465b465bba6ab1c78&query=" +
    `${latitude},${longitude}` +
    "&forecast_days=1&hourly=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Brak połączenia z serwerem www.weatherstack.com", undefined);
    } else if (body.success === false) {
      callback(body.error.info, undefined);
    } else {
      callback(undefined, {
        forecast: `Pogoda dla miasta ${planceName} na chwilę obecną: temperatura wynosi ${
          body.current.temperature
        }°C, a odczuwalna to ${
          body.current.temperature > body.current.feelslike ? "tylko" : ""
        } ${body.current.feelslike}°C; wiatr o sile ${
          body.current.wind_speed
        } m/s z kierunku ${body.current.wind_dir}.`,
      });
    }
  });
};

module.exports = weatherReport;
