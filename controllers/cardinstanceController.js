const Card = require("../models/card");
const CardInstance = require("../models/cardinstance");
const asyncHandler = require("express-async-handler");
const Deck = require("../models/deck");

// Display list of all CardInstances.
exports.cardinstance_list = asyncHandler(async (req, res, next) => {
  const allCardInstances = await CardInstance.find().populate("card").exec();

  res.render("cardinstance_list", {
    title: "Card Instance List",
    cardinstance_list: allCardInstances,
  });
});

// Display detail page for a specific CardInstance.
exports.cardinstance_detail = asyncHandler(async (req, res, next) => {
  const [cardinstance, allDecks] = await Promise.all([
    CardInstance.findById(req.params.id)
      .populate("card")
      .populate("deck")
      .exec(),
    Deck.find({}, "name id").exec(),
  ]);

  const response = await fetch(
    `https://api.scryfall.com/cards/${cardinstance.card.sfId}`,
    {
      mode: "cors",
    }
  );
  const json = await response.json();

  if (cardinstance === null) {
    const err = new Error("Card copy not found.");
    err.status = 404;
    return next(err);
  }

  res.render("cardinstance_detail", {
    cardinstance: cardinstance,
    json: json,
    decks: allDecks,
  });
});

// Handle CardInstance delete on POST.
exports.cardinstance_delete_post = asyncHandler(async (req, res, next) => {
  let cardinstance = await CardInstance.findById(req.body.id)
    .populate({
      path: "deck",
      populate: {
        path: "cardinstances",
        populate: {
          path: "card",
          model: "Card",
        },
      },
    })
    .exec();

  if (cardinstance.deck != undefined) {
    cardinstance.deck.cardinstances.pull(cardinstance);
    cardinstance.deck.save();
  }

  cardinstance.deleteOne();
  res.redirect("back");
});

exports.cardinstance_add_deck_post = asyncHandler(async (req, res, next) => {
  let [deck, cardinstance] = await Promise.all([
    Deck.findById(req.body.deck_id)
      .populate({
        path: "cardinstances",
        populate: {
          path: "card",
          model: "Card",
        },
      })
      .exec(),
    CardInstance.findById(req.body.cardinstance_id).exec(),
  ]);

  deck.cardinstances.push(cardinstance);
  deck.save();

  cardinstance.deck = deck;
  cardinstance.save();

  res.redirect("back");
});
