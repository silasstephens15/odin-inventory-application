const { Router } = require("express");
const {
  getManufacturers,
  getProductInManufacturer,
  getAllProducts,
} = require("../models/query");
const { addManufacturer, deleteManufacturer } = require("../models/update");
const ForbiddenError = require("../error/forbidden");

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
manufacturerRouter.delete("/:name&:password", async (req, res, next) => {
  if (req.params.password != process.env.PASSWORD) {
    return new ForbiddenError("Incorrect Password");
  } else {
    await deleteManufacturer(req.params.name);
    res.json({ redirect: "/" });
  }
});

module.exports = { manufacturerRouter };
