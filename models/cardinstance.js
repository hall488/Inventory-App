const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CardInstanceSchema = new Schema({
  card: { type: Schema.Types.ObjectId, ref: "Card", required: true }, // reference to the associated book
  deck: { type: Schema.Types.ObjectId, ref: "Deck" },
});

// Virtual for bookinstance's URL
CardInstanceSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/cardinstance/${this._id}`;
});

// Export model
module.exports = mongoose.model("CardInstance", CardInstanceSchema);
