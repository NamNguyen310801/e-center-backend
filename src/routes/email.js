const express = require("express");
const router = express.Router();
const emailController = require("../controllers/emailController");

router.post("/send-tuition", emailController.sendTuition);
router.post("/send-salary", emailController.sendSalary);
router.post("/confirm-tuition", emailController.sendSalary);
router.post("/confirm-salary", emailController.sendSalary);
router.post("/confirm-course", emailController.confirmRegisterCourse);

module.exports = router;
