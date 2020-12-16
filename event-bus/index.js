const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events", (req, res) => {
  try {
    const event = req.body;

    axios.post("http://localhost:4000/events", event); // posts
    axios.post("http://localhost:4001/events", event); // comments
    axios.post("http://localhost:4002/events", event); // query

    res.send({ status: "OK" });
  } catch (e) {
    console.log("Error");
  }
});

app.listen(4005, () => console.log("Events up on port 4005"));
