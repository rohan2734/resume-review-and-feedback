const express = require("express");

const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload")

const userRoutes = require("./routes/users-routes");
const resumeRoutes = require("./routes/resume-routes");

const app = express();

cloudinary.config({
    cloud_name:"dpkzlolzi",
    api_key:"236238656165683",
    api_secret:"0YfGl42Aw1mdf-WQ-NK7zqynvK4",
    secure:true
})


app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(fileUpload({useTempFiles:true}))
// app.use(fileUpload())
app.use('/api/users',userRoutes);
app.use('/api/resumes',resumeRoutes);

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