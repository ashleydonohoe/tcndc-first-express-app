const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

let app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;

  console.log(log);

  fs.appendFile('server.log', log + '\n');
  next();
});

// app.use((req, res, next) => {
//   res.render("maintenance.hbs", {
//     pageTitle: "Page Not Available",
//     errorMessage: "This page is under construction"
//   })
// });

app.use(express.static(__dirname + "/public"));


hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text) => {
  return text.toUpperCase();
});

app.get("/", (req, res) => {
  res.render("home.hbs", {
    pageTitle: "Home Page",
    welcomeMessage: "Welcome to our website!"
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About Page"
  });
});

app.get("/bad", (req, res) => {
  res.send({
    errorMessage: "This is a bad page"
  });
});

app.listen(3000, () => {
  console.log("Starting server on port 3000");
});
