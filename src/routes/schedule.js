const express = require("express");
const router = express.Router();
const scheduleController = require("../controllers/scheduleController");
const { authMiddleware } = require("../middleware/auth");

router.post("/create", scheduleController.createSchedule);
router.put("/update/:id", authMiddleware(1), scheduleController.updateSchedule);
router.get("/getAll", scheduleController.getAllSchedule);
router.delete(
  "/delete-schedule/:id",
  authMiddleware(1),
  scheduleController.deleteSchedule
);

module.exports = router;
