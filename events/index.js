const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.listen(4003, () => console.log("Events up on port 4003"));
