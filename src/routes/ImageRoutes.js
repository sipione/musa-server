const { Router } = require("express");
const { ImageController } = require("../controllers");

const routes = Router();

routes
.get("/images", ImageController.getImages)
.get("/images/:id", ImageController.getImagesbyUserId)
.put("/images/:id", ImageController.updateImage)
.post("/images", ImageController.postImages)
.delete("image/:id", ImageController.deleteImage)

module.exports = routes;