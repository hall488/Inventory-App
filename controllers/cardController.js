const Card = require("../models/card");
const CardInstance = require("../models/cardinstance");
const fetch = require("node-fetch");

const asyncHandler = require("express-async-handler");

exports.card_list = asyncHandler(async (req, res, next) => {
  const allCards = await Card.find({}, "name").exec();

  res.render("card_list", { title: "Card List", card_list: allCards });
});

exports.card_detail = asyncHandler(async (req, res, next) => {
  const [card, cardInstances] = await Promise.all([
    Card.findById(req.params.id).exec(),
    CardInstance.find({ card: req.params.id }).exec(),
  ]);

  console.log(req.params.id);

  const response = await fetch(`https://api.scryfall.com/cards/${card.sfId}`, {
    mode: "cors",
  });
  const json = await response.json();

  if (card === null) {
    const err = new Error("Card not found");
    err.status = 404;
    return next(err);
  }
  //console.log(json);
  res.render("card_detail", {
    name: card.name,
    card: card,
    card_instances: cardInstances,
    json: json,
  });
});

exports.card_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: card create GET");
});

exports.card_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: card create POST");
});

exports.card_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: card delete GET");
});

exports.card_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: card delete POST");
});

exports.card_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: card update GET");
});

exports.card_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: card update POST");
});
