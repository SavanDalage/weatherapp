const request = require("request");

const geoCode = function (address, callback) {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYmFzdGV0ZSIsImEiOiJjbGY3NmR6bmUxYnU4M3RvY3QzaGZjcHR4In0.Qc1wC_Q_f6MHNJpYWPdFGQ&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Brak połączenia z serwerem www.mapbox.com", undefined);
    } else if (!body.features[0]) {
      callback("Nie podano prawidłowej nazwy miasta.", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].text,
        place_name: body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
