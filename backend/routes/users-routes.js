const express = require("express");

const router = express.Router();

const userControllers = require("../controllers/users-controllers");

// router.get("/", (req,res,next) => {
//     console.log("get request in users routes");
//     res.json({message:"get request in users"})
// });

router.post("/signup-user",userControllers.signupUser);
router.post("/login-user",userControllers.loginUser);

module.exports = router;


