const { Router } = require("express");
const { ImageController } = require("../controllers");

const routes = Router();

routes
.get("/api/images", ImageController.getImages)
.get("/api/images/:id", ImageController.getImagesbyUserId)
.put("/api/images/:id", ImageController.updateImage)
.post("/api/images", ImageController.postImages)
.delete("/api/image/:id", ImageController.deleteImage)

module.exports = routes;