const { Router } = require("express");
const { ImageController } = require("../controllers");

const routes = Router();

routes
.get("/api/images", ImageController.getImages)
.get("/api/images/:id", ImageController.getImagesbyUserId)
.get("/api/avatar/:id", ImageController.getAvatar)
.put("/api/images/:id", ImageController.updateImage)
.post("/api/images", ImageController.postImages)
.delete("/api/images/:id", ImageController.deleteImage)

module.exports = routes;