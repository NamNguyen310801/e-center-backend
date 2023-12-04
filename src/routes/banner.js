const express = require("express");
const router = express.Router();
const imageController = require("../controllers/imageController");
const { authMiddleware } = require("../middleware/auth");
router.post("/create", imageController.createBanner);
router.put("/update/:id", authMiddleware(1), imageController.updateBanner);
router.get("/getAll", imageController.getAllBanner);
router.delete(
  "/delete-banner/:id",
  authMiddleware(1),
  imageController.deleteBanner
);
module.exports = router;
