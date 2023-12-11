const express = require("express");
const {
  loginController,
  registerController,
  authController,
  applyTeacherController,
  getAllNotificationController,
  deleteAllNotificationController,
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

//router object
const router = express.Router();

//routes
//LOGIN
router.post("/login", loginController);

//REGISTER
router.post("/register", registerController);

//Auth
router.post("/getUserData", authMiddleware, authController);

//Apply teacher
router.post("/apply-teacher", authMiddleware, applyTeacherController);

//notification controller
router.post(
  "/get-all-notification",
  authMiddleware,
  getAllNotificationController
);

//delete all notification
router.post(
  "/delete-all-notification",
  authMiddleware,
  deleteAllNotificationController
);

//GET ALL teacher
// router.get("/getAllTeachers", authMiddleware, getAllTeachersController);

module.exports = router;
