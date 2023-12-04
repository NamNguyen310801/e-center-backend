const express = require("express");
const router = express.Router();
const tuitionController = require("../controllers/tuitionController");
const { authMiddleware } = require("../middleware/auth");

router.post("/create", tuitionController.createTuition);
router.put("/update/:id", authMiddleware(1), tuitionController.updateTuition);
router.get("/getAll", tuitionController.getAllTuition);
router.delete(
  "/delete-tuition/:id",
  authMiddleware(1),
  tuitionController.deleteTuition
);
module.exports = router;
