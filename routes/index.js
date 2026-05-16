const { Router } = require("express");
const { getCategories } = require("../models/query");

const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  getCategories()
    .then((categories) => {
      res.render("index", { title: "Home", categories });
    })
    .catch((err) => console.log(err));
});

module.exports = { indexRouter };
