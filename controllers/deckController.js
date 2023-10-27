const CardInstance = require("../models/cardinstance");
const Deck = require("../models/deck.js");
const fetch = require("node-fetch");
const { body, validationResult } = require("express-validator");

const asyncHandler = require("express-async-handler");
const { Schema } = require("mongoose");

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

  res.render("deck_detail", {
    name: deck.name,
    card_instances: deck.cardinstances,
  });
});

exports.deck_create_get = asyncHandler(async (req, res, next) => {
  res.render("deck_form", { title: "Create Deck" });
});

exports.deck_create_post = [
  // Validate and sanitize the name field.
  body("name", "name must be valid length")
    .notEmpty()
    .isLength({ min: 1, max: 24 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log("1");
      res.redirect("/CreateDeck");
      return;
    }

    console.log(errors);

    let existingDeck = await Deck.find({ name: req.body.name }).exec();

    if (existingDeck.length != 0) {
      console.log("2");
      res.redirect("/CreateDeck");
      return;
    }

    let deck = new Deck({
      name: req.body.name,
    });

    deck.save();

    res.redirect(`/deck/${deck.id}`);
  }),
];

exports.deck_delete_post = asyncHandler(async (req, res, next) => {
  let deck = await Deck.findById(req.body.id)
    .populate({
      path: "cardinstances",
      populate: {
        path: "card",
        model: "Card",
      },
    })
    .exec();

  deck.cardinstances.forEach((ci) => {
    ci.deck = undefined;
    ci.save();
  });

  deck.deleteOne();

  res.redirect("back");
});

exports.deck_remove_card_post = asyncHandler(async (req, res, next) => {
  let [deck, cardinstance] = await Promise.all([
    Deck.findById(req.params.id)
      .populate({
        path: "cardinstances",
        populate: {
          path: "card",
          model: "Card",
        },
      })
      .exec(),
    CardInstance.findById(req.body.id),
  ]);

  deck.cardinstances.pull(cardinstance);
  deck.save();
  cardinstance.deck = undefined;
  cardinstance.save();
  res.redirect("back");
});
