const express = require("express");
const router = express.Router();
const salaryController = require("../controllers/salaryController");
const { authMiddleware } = require("../middleware/auth");

router.post("/create", salaryController.createSalary);
router.put("/update/:id", authMiddleware(1), salaryController.updateSalary);
router.get("/getAll", salaryController.getAllSalary);
router.delete(
  "/delete-salary/:id",
  authMiddleware(1),
  salaryController.deleteSalary
);

module.exports = router;
