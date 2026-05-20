const express = require("express");
const { indexRouter } = require("./routes/index");
const path = require("node:path");
const { categoryRouter } = require("./routes/category");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter);
app.use("/category", categoryRouter);

app.listen(3000);
