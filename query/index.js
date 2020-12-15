const express = require("express");
const app = express();

app.get("/events", (req, res) => {
  res.send("ok");
});

app.listen(4002, () => console.log("Query up on port 4002"));
