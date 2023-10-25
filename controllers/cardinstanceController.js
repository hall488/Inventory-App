const CardInstance = require("../models/cardinstance");
const asyncHandler = require("express-async-handler");

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
  res.send(`NOT IMPLEMENTED: CardInstance detail: ${req.params.id}`);
});

// Display CardInstance create form on GET.
exports.cardinstance_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: CardInstance create GET");
});

// Handle CardInstance create on POST.
exports.cardinstance_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: CardInstance create POST");
});

// Display CardInstance delete form on GET.
exports.cardinstance_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: CardInstance delete GET");
});

// Handle CardInstance delete on POST.
exports.cardinstance_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: CardInstance delete POST");
});

// Display CardInstance update form on GET.
exports.cardinstance_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: CardInstance update GET");
});

// Handle cardinstance update on POST.
exports.cardinstance_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: CardInstance update POST");
});
