const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const heroSchema = new Schema({
  name: String,
  skills: String,
});

module.exports = mongoose.model("Hero", heroSchema);
