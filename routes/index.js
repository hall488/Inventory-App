var express = require("express");
var router = express.Router();

const card_controller = require("../controllers/cardController");
const cardinstance_controller = require("../controllers/cardinstanceController");
const deck_controller = require("../controllers/deckController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/cards", card_controller.card_list);
router.get("/card/:id", card_controller.card_detail);

router.get("/cardinstances", cardinstance_controller.cardinstance_list);
router.get("/cardinstance/:id", cardinstance_controller.cardinstance_detail);

router.get("/decks", deck_controller.deck_list);
router.get("/deck/:id", deck_controller.deck_detail);

module.exports = router;
