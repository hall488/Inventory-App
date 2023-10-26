const CardInstance = require("../models/cardinstance");
const Deck = require("../models/deck.js");
const fetch = require("node-fetch");

const asyncHandler = require("express-async-handler");

exports.deck_list = asyncHandler(async (req, res, next) => {
  const allDecks = await Deck.find({}, "name").exec();

  res.render("deck_list", { title: "Deck List", deck_list: allDecks });
});

exports.deck_detail = asyncHandler(async (req, res, next) => {
  const deck = await Deck.findById(req.params.id)
    .populate({
      path: "cardinstances",
      populate: {
        path: "card",
        model: "Card",
      },
    })
    .exec();

  if (deck === null) {
    const err = new Error("Card not found");
    err.status = 404;
    return next(err);
  }

  console.log(deck.cardinstances);

  res.render("deck_detail", {
    name: deck.name,
    card_instances: deck.cardinstances,
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
