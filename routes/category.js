const { Router } = require("express");
const { getCategories, getProductInCategory } = require("../models/query");

const categoryRouter = Router();

getCategories().then((categories) => {
  categories.map((category) => {
    categoryRouter.get("/" + category.name, (req, res) => {
      getProductInCategory(category.name).then((parts) => {
        res.render("category", { title: category.name, parts });
      });
    });
  });
});

module.exports = { categoryRouter };
