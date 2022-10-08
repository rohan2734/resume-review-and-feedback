const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require("./routes/users-routes");

const app = express();

app.use(bodyParser.json());
app.use('/api/users',userRoutes);

//resume review is the database name
mongoose
.connect('mongodb+srv://resumeReview:iZEtyfwh9dSUyS6U@cluster0.3kcv6.mongodb.net/resumeReview?retryWrites=true&w=majority')
.then(()=>{
    console.log("database connected successfully");
    app.listen(5000);
})
.catch((err)=>{
    console.log(err);
})

// app.listen(5000);
// mongodb+srv://resumeReview:iZEtyfwh9dSUyS6U@cluster0.3kcv6.mongodb.net/?retryWrites=true&w=majority
// password - iZEtyfwh9dSUyS6U
// username - resumeReview