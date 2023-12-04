const express = require("express");
const router = express.Router();
const lessonController = require("../controllers/lessonController");
const { authMiddleware } = require("../middleware/auth");

router.post("/create", lessonController.createLesson);
router.put("/update/:id", authMiddleware(1), lessonController.updateLesson);
router.get("/getAll", lessonController.getAllLesson);
router.delete(
  "/delete-lesson/:id",
  authMiddleware(1),
  lessonController.deleteLesson
);
module.exports = router;
