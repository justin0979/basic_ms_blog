const express = require("express");

const app = express();

app.get("/", (req, res) => res.send("comments"));

app.listen(4001, () => console.log("Comments up on 4001"));
