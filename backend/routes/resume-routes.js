const express = require("express");

const router = express.Router();

const middleWares = require("../middlwares/authenticateToken");
const resumeControllers = require("../controllers/resume-controllers");

// router.get("/",(req,res) => {
//     // res.send("connected to resume controllers")
//     res.json({message:"get request in resumes"})
// })
router.post("/create-resume",middleWares.authenticateToken , resumeControllers.createResume);

module.exports = router;