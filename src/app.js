const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const weatherReport = require("./utils/weather");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const webbPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup jandlebars and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(webbPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Pogoda",
    name: "Krzysztof Kondrat",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "O stronie",
    name: "Krzysztof Kondrat",
    question: "Strona zrobiona w ramach nauki Node.js",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Pomoc",
    name: "Krzysztof Kondrat",
    tip1: "1. Nazwa miasta może zawierać polskie znaki.",
    tip2: `2. Jeżeli miasto nie jest tym, które szukałeś (np. jest w innym kraju), to dopisz kraj. Np. "warszawa poland".`,
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Musisz wprowadzić adres." });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location, place_name }) => {
      if (error) {
        return res.send({ error });
      }

      weatherReport(latitude, longitude, (error, forecast) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecast,
          city: location,
          exact_location: place_name,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Krzysztof Kondrat",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Krzysztof Kondrat",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
