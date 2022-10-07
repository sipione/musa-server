const { Router } = require("express");
const { CategoryController } = require("../controllers");

const routes = Router();

routes
    .get("/categories", CategoryController.getAllCategories)
    .post("/categories", CategoryController.CreateCategories)
module.exports = routes