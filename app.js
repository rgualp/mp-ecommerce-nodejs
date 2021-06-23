require('dotenv').config();
var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require('body-parser')
var app = express();
require('express-ws')(app);
var port = process.env.PORT || 3000;
const MercadoPago = require("./src/mp.service");

const clients = new Set();

app.use(express.json())
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.use(express.static("assets"));
app.use("/assets", express.static(__dirname + "/assets"));

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/detail", async (req, res) => {
  let data = req.query;
  let preference = await MercadoPago.createPreference(data);
  data.preference = preference;
  res.render("detail", data);
});

app.get("/success", async (req, res) => {
  res.render("success");
});

app.get("/pending", async (req, res) => {
  res.render("pending");
});

app.get("/failure", async (req, res) => {
  res.render("failure");
});

app.post("/hooks", async (req, res) => {
  for(let client of clients) {
    client.send(JSON.stringify(req.body));
  }
  res.status(204).send();
});

app.ws('/ws', function(ws, req) {
  clients.add(ws);
});

const listener = app.listen(port, function () {
  console.log("Listening on port " + listener.address().port);
});
