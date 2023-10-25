const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CardSchema = new Schema({
  name: { type: String, required: true },
  sfId: { type: String, required: true },
});

//Virtual for books url
CardSchema.virtual("url").get(function () {
  return `/card/${this._id}`;
});

module.exports = mongoose.model("Card", CardSchema);
