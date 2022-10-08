const express = require("express");

const router = express.Router();

const userControllers = require("../controllers/users-controllers");

// router.get("/", (req,res,next) => {
//     console.log("get request in users routes");
//     res.json({message:"get request in users"})
// });

router.post("/create-user",userControllers.createUser);

module.exports = router;


