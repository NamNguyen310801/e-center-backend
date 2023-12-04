const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authMiddleware, authUserMiddleWare } = require("../middleware/auth");

router.post("/register", userController.register);
router.post("/log-in", userController.loginUser);
router.post("/log-out", userController.logoutUser);
router.put("/update-user/:id", authUserMiddleWare, userController.updateUser);
router.put(
  "/update-teacher/:id",
  authUserMiddleWare,
  userController.updateTeacher
);
router.put(
  "/update-student/:id",
  authUserMiddleWare,
  userController.updateStudent
);
router.delete("/delete-user/:id", authMiddleware(1), userController.deleteUser);
router.get("/getAll", userController.getAllUser);
router.get("/getAllStudent", userController.getAllStudent);
router.put(
  "/add-course/:id",
  authUserMiddleWare,
  userController.registerCourse
);
router.put(
  "/update-course/:id/:courseId",
  authUserMiddleWare,
  userController.updateCourseStudent
);
router.put(
  "/add-tuition/:id",
  authMiddleware(1),
  userController.addTuitionStudent
);
router.put(
  "/update-tuition/:id/:tuitionId",
  authMiddleware(1),
  userController.updateTuitionStudent
);
router.delete(
  "/delete-tuition/:id/:tuitionId",
  authMiddleware(1),
  userController.deleteTuitionStudent
);
router.put(
  "/add-salary/:id",
  authMiddleware(1),
  userController.addSalaryTeacher
);
router.put(
  "/update-salary/:id/:salaryId",
  authMiddleware(1),
  userController.updateSalaryTeacher
);
router.delete(
  "/delete-salary/:id/:salaryId",
  authMiddleware(1),
  userController.deleteSalaryTeacher
);
router.get("/getAllTeacher", userController.getAllTeacher);
router.get("/get-detail/:id", authUserMiddleWare, userController.getDetailUser);
router.post("/refresh-token", userController.refreshToken);
router.post("/forgot-password", userController.forgetPassword);
router.post("/verify-otp", userController.verifyOTP);
router.post("/reset-password", userController.resetPassword);
router.post("/delete-many", authMiddleware(1), userController.deleteManyUser);
module.exports = router;
