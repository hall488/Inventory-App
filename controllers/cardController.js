const Card = require("../models/card");
const CardInstance = require("../models/cardinstance");
const Deck = require("../models/deck");
const fetch = require("node-fetch");
const { body, validationResult } = require("express-validator");

const asyncHandler = require("express-async-handler");

exports.card_list = asyncHandler(async (req, res, next) => {
  const allCards = await Card.find({}, "name").exec();
  const allCardCounts = await Promise.all(
    allCards.map((card) => {
      return CardInstance.countDocuments({ card: card.id }).exec();
    })
  );

  res.render("card_list", {
    title: "Card List",
    card_list: allCards,
    instance_counts: allCardCounts,
  });
});

exports.card_detail = asyncHandler(async (req, res, next) => {
  const [card, cardInstances] = await Promise.all([
    Card.findById(req.params.id).exec(),
    CardInstance.find({ card: req.params.id }).populate("deck").exec(),
  ]);

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

exports.card_search_get = asyncHandler(async (req, res, next) => {
  res.render("card_search", { title: "Card Search" });
});

exports.card_create_get = asyncHandler(async (req, res, next) => {
  const allDecks = await Deck.find({}, "name id").exec();

  const response = await fetch(
    `https://api.scryfall.com/cards/${req.params.id}`,
    {
      mode: "cors",
    }
  );
  const json = await response.json();

  res.render("card_form", {
    title: "Create Card",
    json: json,
    decks: allDecks,
  });
});

// Handle Genre create on POST.
exports.card_create_post = [
  // Validate and sanitize the name field.
  body("quantity", "Quantity must be a valid number")
    .notEmpty()
    .isInt({ min: 1, max: 10 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("index", {
        title: "Messages",
        errors: errors.array(),
      });
      res.redirect(`/createCard/${req.params.id}`);
      return;
    }

    console.log(errors);

    let existingCards = await Card.find({ sfId: req.params.id }).exec();
    let cardType;

    if (existingCards.length == 0) {
      const card = new Card({
        name: req.body.name,
        sfId: req.params.id,
      });

      await card.save();

      cardType = card;
    } else {
      cardType = existingCards[0];
    }

    for (let i = 0; i < req.body.quantity; i++) {
      let cardinstance;

      if (req.body.deck == "none") {
        cardinstance = new CardInstance({
          card: cardType,
        });
      } else {
        cardinstance = new CardInstance({
          card: cardType,
          deck: req.body.deck,
        });

        let deck = await Deck.findById(req.body.deck)
          .populate({
            path: "cardinstances",
            populate: {
              path: "card",
              model: "Card",
            },
          })
          .exec();

        deck.cardinstances.push(cardinstance);
        await deck.save();
      }

      await cardinstance.save();
    }

    res.redirect(`/card/${cardType.id}`);
    return;
  }),
];

exports.card_delete_post = asyncHandler(async (req, res, next) => {});
