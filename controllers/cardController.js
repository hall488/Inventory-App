const Card = require("../models/card");
const fetch = require("node-fetch");

const asyncHandler = require("express-async-handler");

exports.card_list = asyncHandler(async (req, res, next) => {
  const allCards = await Card.find({}, "name").exec();

  res.render("card_list", { title: "Card List", card_list: allCards });
});

exports.card_detail = asyncHandler(async (req, res, next) => {
  const [card, cardInstances, cardJson] = await Promise.all([
    Card.findById(req.params.id).exec(),
    //CardInstance.find({ card: req.params.id }).exec(),
  ]);
  console.log(`https://api.scryfall.com/cards/${card.sfId}`);
  const response = await fetch(`https://api.scryfall.com/cards/${card.sfId}`, {
    mode: "cors",
  });
  const json = await response.json();

  if (card === null) {
    const err = new Error("Card not found");
    err.status = 404;
    return next(err);
  }
  console.log(json.image_uris.normal);
  res.render("card_detail", {
    name: card.name,
    card: card,
    //card_instances: cardInstances,
    source: json.image_uris.normal,
  });
});
