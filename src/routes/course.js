const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const { authMiddleware } = require("../middleware/auth");

router.post("/create", courseController.createCourse);
router.put("/update/:id", authMiddleware(1), courseController.updateCourse);
router.get("/getAll", courseController.getAllCourse);
router.get("/get-detail/:id", courseController.getDetailCourse);
router.delete(
  "/delete-course/:id",
  authMiddleware(1),
  courseController.deleteCourse
);
router.put(
  "/:id/add-track",
  authMiddleware(1),
  courseController.addTrackToCourse
);
router.put(
  "/:id/update-track/:trackId",
  authMiddleware(1),
  courseController.updateTrack
);
router.put(
  "/:id/delete-track/:trackId",
  authMiddleware(1),
  courseController.deleteTrack
);
router.put(
  "/:id/:trackId/add-lesson",
  authMiddleware(1),
  courseController.addLessonToCourse
);
router.delete(
  "/:id/:trackId/delete-lesson/:lessonId",
  authMiddleware(1),
  courseController.deleteLessonInCourse
);
module.exports = router;
