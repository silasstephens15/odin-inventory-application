const { Router } = require("express");
const {
  getManufacturers,
  getProductInManufacturer,
  getAllProducts,
} = require("../models/query");
const { addManufacturer } = require("../models/update");

const manufacturerRouter = Router();

getManufacturers().then((manufacturers) => {
  manufacturers.map((manufacturer) => {
    manufacturerRouter.get("/" + manufacturer.name, (req, res) => {
      getProductInManufacturer(manufacturer.name).then((parts) => {
        res.render("browse", {
          title: manufacturer.name,
          parts,
          oneManufacturer: true,
          oneCategory: false,
        });
      });
    });
  });
  manufacturerRouter.get("/all", (req, res) => {
    getAllProducts().then((parts) => {
      res.render("browse", {
        title: "All",
        parts,
        oneManufacturer: false,
        oneCategory: false,
      });
    });
  });
  manufacturerRouter.get("/add", (req, res) => {
    res.render("add-category", {
      title: "Add Manufacturer",
      location: "manufacturer",
    });
  });
  manufacturerRouter.post("/add", (req, res, next) => {
    addManufacturer(req.body.name, req.body.password)
      .then(() => {
        res.redirect("/");
      })
      .catch((err) => {
        next(err);
      });
  });
});

module.exports = { manufacturerRouter };
