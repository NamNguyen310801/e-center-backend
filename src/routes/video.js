const express = require("express");
const router = express.Router();
const videoController = require("../controllers/videoController");
const { authMiddleware } = require("../middleware/auth");

router.post("/create", videoController.createVideo);
router.put("/update/:id", authMiddleware(1), videoController.updateVideo);
router.get("/getAll", videoController.getAllVideo);
router.delete(
  "/delete-video/:id",
  authMiddleware(1),
  videoController.deleteVideo
);

module.exports = router;
