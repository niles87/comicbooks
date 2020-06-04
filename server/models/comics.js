const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const comicbookSchema = new Schema({
  name: String,
  publisher: String,
  heroId: String,
});

module.exports = mongoose.model("Comic", comicbookSchema);
