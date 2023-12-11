const express = require("express");
const { postAssignmentController } = require("../controllers/teacherCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/postassignment", postAssignmentController);

// //POST SINGLE Teacher INFO
// router.post("/getTeacherInfo", authMiddleware, getTeacherInfoController);

// //POST UPDATE PROFILE
// router.post("/updateProfile", authMiddleware, updateProfileController);

// //POST  GET SINGLE teacher INFO
// router.post("/getTeacherById", authMiddleware, getTeacherByIdController);

// //GET Appointments
// router.get(
//   "/teacher-appointments",
//   authMiddleware,
//   teacherAppointmentsController
// );

// //POST Update Status
// router.post("/update-status", authMiddleware, updateStatusController);

module.exports = router;
