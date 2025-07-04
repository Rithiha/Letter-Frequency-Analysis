const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api", routes);

mongoose.connect("mongodb://localhost:27017/miniproject", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
