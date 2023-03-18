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
  let location = req.query.address;

  geocode(location, (error, data) => {
    if (error) {
      return res.send({ error });
    }

    weatherReport(data, (error, { placeFull, planceName, forecast }) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecast,
        city: planceName,
        exact_location: placeFull,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Krzysztof Kondrat",
    errorMessage: "Help article not found",
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term.",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
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
  console.log(`Server działa na porcie ${port}.`);
});
