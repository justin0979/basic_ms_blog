const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const events = []; // Not for production, ONLY practice

app.post("/events", async (req, res) => {
  const event = req.body;

  events.push(event); // Not for production, ONLY practice

  axios.post("http://posts-clusterip-srv:4000/events", event); // posts
  axios.post("http://comments-srv:4001/events", event); // comments
  axios.post("http://moderation-srv:4003/events", event); // moderation
  //
  //  // query service code is in try/catch b/c it is the service
  //  // that can go down and request past events from this
  //  // event-bus server.
  try {
    await axios.post("http://query-srv:4002/events", event); // query
  } catch (e) {
    console.log("Query service down");
  }

  res.send({ status: "OK" });
});

// Not for production, ONLY for practice
app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => console.log("Events up on port 4005"));
