const express = require("express");
const router = express.Router();
const classController = require("../controllers/classController");
const { authMiddleware } = require("../middleware/auth");

router.post("/create", classController.createClass);
router.put("/update/:id", authMiddleware(1), classController.updateClass);
router.get("/getAll", classController.getAllClass);
router.delete(
  "/delete-class/:id",
  authMiddleware(1),
  classController.deleteClass
);

module.exports = router;
