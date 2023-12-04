const express = require("express");
const router = express.Router();
const imageController = require("../controllers/imageController");
const { authMiddleware } = require("../middleware/auth");

router.post("/create", imageController.createImage);
router.put("/update/:id", authMiddleware(1), imageController.updateImage);
router.get("/getAll", imageController.getAllImage);
router.delete(
  "/delete-image/:id",
  authMiddleware(1),
  imageController.deleteImage
);

module.exports = router;
