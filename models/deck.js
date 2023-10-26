const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DeckSchema = new Schema({
  name: { type: String, required: true },
  cardinstances: [{ type: Schema.Types.ObjectId, ref: "CardInstance" }],
});

//Virtual for books url
DeckSchema.virtual("url").get(function () {
  return `/deck/${this._id}`;
});

module.exports = mongoose.model("Deck", DeckSchema);
