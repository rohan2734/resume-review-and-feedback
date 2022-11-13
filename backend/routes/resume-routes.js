const express = require("express");

const router = express.Router();

const middleWares = require("../middlwares/authenticateToken");
const multerUploader = require("../middlwares/multerUploader");
const resumeControllers = require("../controllers/resume-controllers");

// router.get("/",(req,res) => {
//     // res.send("connected to resume controllers")
//     res.json({message:"get request in resumes"})
// })
router.post(
  "/create-resume",
  middleWares.authenticateToken,
  resumeControllers.createResume
);
router.get(
  "/get-resumes",
  middleWares.authenticateToken,
  resumeControllers.getResumes
);
router.get(
  "/get-resume/:resumeId",
  middleWares.authenticateToken,
  resumeControllers.getResumeById
);
router.patch(
  "/edit-resume-name-details",
  middleWares.authenticateToken,
  multerUploader.single("profilePic"),
  resumeControllers.editResumeNameDetails
);

router.patch(
  "/edit-resume-profile-description",
  middleWares.authenticateToken,
  resumeControllers.editResumeProfileDescription
);

router.patch(
  "/edit-resume-professional-experience",
  middleWares.authenticateToken,
  resumeControllers.editResumeProfessionalExperience
);
module.exports = router;
