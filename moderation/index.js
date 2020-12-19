const express = require("express");
const bodyParser = require("body-parser");
const axions = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events", (req, res) => {});

app.listen(4003, () => console.log("Moderation up on port 4003"));
