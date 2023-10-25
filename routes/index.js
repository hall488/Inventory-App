var express = require("express");
var router = express.Router();

const card_controller = require("../controllers/cardController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/cards", card_controller.card_list);

router.get("/card/:id", card_controller.card_detail);

module.exports = router;
