var express = require("express");
var router = express.Router();

const card_controller = require("../controllers/cardController");
const cardinstance_controller = require("../controllers/cardinstanceController");
const deck_controller = require("../controllers/deckController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "MTG Collection" });
});

router.get("/cards", card_controller.card_list);
router.get("/card/:id", card_controller.card_detail);

router.get("/cardinstances", cardinstance_controller.cardinstance_list);
router.get("/cardinstance/:id", cardinstance_controller.cardinstance_detail);
router.post(
  "/cardinstance/:id",
  cardinstance_controller.cardinstance_add_deck_post
);

router.get("/decks", deck_controller.deck_list);
router.post("/decks", deck_controller.deck_delete_post);
router.get("/deck/:id", deck_controller.deck_detail);
router.post("/deck/:id", deck_controller.deck_remove_card_post);

router.get("/search", card_controller.card_search_get);

router.get("/createCard/:id", card_controller.card_create_get);
router.post("/createCard/:id", card_controller.card_create_post);

router.get("/createDeck", deck_controller.deck_create_get);
router.post("/createDeck", deck_controller.deck_create_post);

router.post("/card/:id", cardinstance_controller.cardinstance_delete_post);

module.exports = router;
