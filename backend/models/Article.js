const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: String,
  text: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Article", articleSchema);
