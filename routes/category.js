const { Router } = require("express");
const {
  getCategories,
  getProductInCategory,
  getAllProducts,
} = require("../models/query");
const { addCategory } = require("../models/update");

const categoryRouter = Router();

getCategories().then((categories) => {
  categories.map((category) => {
    categoryRouter.get("/" + category.name, (req, res) => {
      getProductInCategory(category.name).then((parts) => {
        res.render("category", { title: category.name, parts });
      });
    });
  });
  categoryRouter.get("/all", (req, res) => {
    getAllProducts().then((parts) => {
      res.render("category", { title: "All", parts });
    });
  });
  categoryRouter.get("/add", (req, res) => {
    res.render("add-category", { title: "Add Category" });
  });
  categoryRouter.post("/add", (req, res) => {
    addCategory(req.body.name, req.body.password).then(() => {
      res.redirect("/");
    });
  });
});

module.exports = { categoryRouter };
