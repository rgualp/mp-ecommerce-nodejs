require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var app = express();
require("express-ws")(app);
var port = process.env.PORT || 3000;
require("./src/database.config");
const MercadoPago = require("./src/mp.service");
const ResponseModel = require("./src/reponse.model");

const clients = new Set();

app.use(express.json());
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

app.post("/success", async (req, res) => {
  let response = new ResponseModel({
    response: JSON.stringify(req.query),
    type: "success",
  });
  response.save();
  res.render("success", req.query);
});

app.get("/pending", async (req, res) => {
  res.render("pending");
});

app.get("/failure", async (req, res) => {
  res.render("failure");
});

app.post("/hooks", async (req, res) => {
  let response = new ResponseModel({
    response: JSON.stringify(req.body),
    type: "hooks",
  });
  response.save();

  for (let client of clients) {
    client.send(JSON.stringify(req.body));
  }
  res.status(201).send();
});

app.ws("/ws", function (ws, req) {
  clients.add(ws);
});

const listener = app.listen(port, function () {
  console.log("Listening on port " + listener.address().port);
});
