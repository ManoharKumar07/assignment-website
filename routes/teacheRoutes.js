// const express = require("express");
// const { postAssignmentController,
//     getTeacherInfoController,
// } = require("../controllers/teacherCtrl");
// const authMiddleware = require("../middlewares/authMiddleware");
// const router = express.Router();

// router.post("/postassignment", postAssignmentController);

const express = require("express");
const {
  getTeacherInfoController,
  updateProfileController,
  getTeacherByIdController,
} = require("../controllers/teacherCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

//POST SINGLE Teacher INFO
router.post("/getTeacherInfo", authMiddleware, getTeacherInfoController);

//POST UPDATE PROFILE
router.post("/updateProfile", authMiddleware, updateProfileController);

//POST  GET SINGLE teacher INFO
router.post("/getTeacherById", authMiddleware, getTeacherByIdController);

module.exports = router;
