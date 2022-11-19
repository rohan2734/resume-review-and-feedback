//models
const Resume = require("../models/resume");
const User = require("../models/user");
const ProfessionalExperience = require("../models/professionalExperience");

//3rd party modules
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload");
const formidable = require("formidable");

//constants
const keys = require("../keys/keys");

const createResume = async (req, res) => {
  const { resumeName, user } = req.body;

  // var existingUser ;

  // try{
  //     existingUser = await User.findOne({_id: user._id})
  // }catch(err){
  //     console.log(err);
  // }

  // console.log({user});
  if (!user) {
    return res.json({ status: 400, message: "jwt decryption failed" });
  }

  if (!resumeName) {
    return res.json({ status: 400, message: "resume name is required" });
  }
  var newResume = new Resume({
    resumeName,
    user: user._id,
  });

  try {
    newResume = await newResume.save();
  } catch (err) {
    console.log(err);
  }
  // console.log({newResume});
  return res.json({
    status: 200,
    message: "resume is created succesfully",
    newResume,
  });
  // return res.json({existingUser})
};

const getResumes = async (req, res) => {
  // const userID = req.body.user._id;
  var user = req.body.user;
  // console.log({user});

  if (!user) {
    return res.json({ status: 400, message: "user is undefined" });
  }
  var resumes;

  try {
    resumes = await Resume.find({ user: user._id });
  } catch (err) {
    console.log(err);
  }

  return res.json({
    status: 200,
    message: "resumes fetched succesfully",
    resumes,
  });
};

const getResumeById = async (req, res) => {
  const { resumeId } = req.params;

  var resume;
  try {
    resume = await Resume.findOne({ _id: resumeId }).populate(
      "professionalExperiences"
    );
  } catch (err) {
    console.log(err);
  }

  if (resume == null) {
    return res.json({ status: 400, message: "resume not found" });
  }

  return res.json({ status: 200, resume });
};

const editResumeNameDetails = async (req, res) => {
  const profilePic = req.file;
  console.log({ profilePic });

  console.log({ reqBody: req.body });

  // const {resumeId} = req.body;
  // console.log({resumeId});
  //     const form = new formidable.IncomingForm();

  //     var fields;
  //     var files;

  //     const ns ={
  //         form_parse: async (req,form) => await new Promise((resolve,reject) => form.parse(req, (err,fields,files) => err ? reject(err) : resolve([fields,files])))
  //     }

  //     try{
  //         [fields,files] = await ns.form_parse(req,form)
  //     }catch(err){
  //         console.log(err);
  //     }
  //    console.log({fields,files});

  //     const {profilePic } = files;
  var { profilePicURL } = req.body;
  console.log({ profilePicURL });
  if (!profilePicURL && !profilePic) {
    return res.json({ status: 400, message: "profile pic is required" });
  }

  const {
    resumeId,
    fullName,
    address,
    gender,
    emailID,
    phoneNumber,
    location,
  } = req.body;

  if (
    !(
      resumeId != null &&
      fullName &&
      address &&
      gender &&
      emailID &&
      location &&
      phoneNumber != null
    )
  ) {
    console.log({ reqBody: req.body });
    return res.json({ status: 400, message: "all fields are required" });
  }
  var uploadedProfilePic;
  //     console.log({profilePic});
  // cloudinary.uploader.upload(profilePic.path)
  // .then( result => {
  //     uploadedProfilePic = result;
  //     console.log({pic127:uploadedProfilePic});
  // })
  // .catch(err => {
  //     console.log(err);
  // })
  try {
    uploadedProfilePic = await cloudinary.uploader.upload(profilePic.path);
  } catch (err) {
    console.log(err);
  }

  var existingResume;
  try {
    existingResume = await Resume.find({ _id: resumeId });
  } catch (err) {
    console.log(err);
  }
  console.log({ existingResume });
  if (!existingResume || existingResume?.length == 0) {
    return res.json({ status: 400, message: "resume not found" });
  }
  var linkedinURL;
  var githubURL;
  var mediumURL;
  var websiteURL;
  var jobTitle;

  if (req.body.linkedinURL != null) {
    linkedinURL = req.body.linkedinURL;
    existingResume = { ...existingResume, linkedinURL };
  }
  if (req.body.githubURL != null) {
    githubURL = req.body.githubURL;
    existingResume = { ...existingResume, githubURL };
  }

  if (req.body.mediumURL != null) {
    mediumURL = req.body.mediumURL;
    existingResume = { ...existingResume, mediumURL };
  }
  if (req.body.websiteURL != null) {
    websiteURL = req.body.websiteURL;
    existingResume = { ...existingResume, websiteURL };
  }
  if (req.body.jobTitle != null) {
    jobTitle = req.body.jobTitle;
    existingResume = { ...existingResume, jobTitle };
  }
  // console.log({picLink : uploadedProfilePic});
  existingResume = {
    ...existingResume,
    fullName,
    address,
    gender: gender.toUpperCase(),
    emailID,
    phoneNumber,
    address,
    location,
    profilePicURL: profilePicURL ? profilePicURL : uploadedProfilePic.url,
  };
  var updatedResume;
  try {
    const filter = { _id: resumeId };

    updatedResume = await Resume.findByIdAndUpdate(filter, existingResume, {
      new: true,
    });
  } catch (err) {
    console.log(err);
  }

  console.log({ updatedResume });

  return res.json({
    status: 200,
    message: "updated the name details of resume succesfully",
    updatedResume,
  });
};

const editResumeProfileDescription = async (req, res) => {
  var { profileDescription, resumeId } = req.body;

  var existingResume;

  try {
    existingResume = await Resume.findOne({ _id: resumeId });
  } catch (err) {
    console.log(err);
  }

  existingResume = {
    ...existingResume,
    profileDescription,
  };

  var updatedResume;

  try {
    updatedResume = await Resume.findByIdAndUpdate(
      { _id: resumeId },
      existingResume,
      { new: true }
    );
  } catch (err) {
    console.log(err);
  }

  console.log({ updatedResume });

  return res.json({
    status: 200,
    message: "updated the profile description of resume succesfully",
    updatedResume,
  });
};

const editResumeAddProfessionalExperience = async (req, res) => {
  var {
    jobTitle,
    employer,
    startDate,
    endDate,
    location,
    description,
    resumeId,
  } = req.body;

  var existingResume;

  try {
    existingResume = await Resume.findOne({ _id: resumeId });
  } catch (err) {
    console.log(err);
  }

  var newProfessionalExperience = new ProfessionalExperience({
    jobTitle,
    employer,
    startDate,
    endDate,
    location,
    description,
  });

  try {
    newProfessionalExperience = await newProfessionalExperience.save();
  } catch (err) {
    console.log(err);
  }
  // console.log({ existingResume });
  existingResume.professionalExperiences = [
    ...existingResume.professionalExperiences,
    newProfessionalExperience,
  ];

  var updatedResume;

  try {
    updatedResume = await Resume.findByIdAndUpdate(
      { _id: resumeId },
      existingResume,
      { new: true }
    ).populate("professionalExperiences");
  } catch (err) {
    console.log(err);
  }

  return res.json({
    status: 200,
    message: "Added professoinal experience",
    updatedResume: updatedResume,
  });

  // return res.json({ message: "" });
};

const editResumeEditProfessionalExperience = async (req, res) => {
  var {
    jobTitle,
    employer,
    startDate,
    endDate,
    location,
    description,
    resumeId,
    professionalExperienceId,
  } = req.body;

  var existingProfessionalExperience;

  try {
    existingProfessionalExperience = await ProfessionalExperience.findOne({
      _id: professionalExperienceId,
    });
  } catch (err) {
    console.log(err);
  }

  existingProfessionalExperience = {
    ...existingProfessionalExperience._doc,
    jobTitle,
    employer,
    startDate,
    endDate,
    location,
    description,
  };

  // console.log({ existingProfessionalExperience });

  // var newProfessionalExperience = {
  //   jobTitle,
  //   employer,
  //   description,
  //   startDate,
  //   endDate,
  //   location,
  //   _id: professionalExperienceId,
  // };
  // console.log({ newProfessionalExperience });

  try {
    updatedProfessionalExperience =
      await ProfessionalExperience.findByIdAndUpdate(
        { _id: professionalExperienceId },
        existingProfessionalExperience,
        { new: true }
      );
  } catch (err) {
    console.log(err);
  }

  console.log({ updatedProfessionalExperience });
  // return res.json({ message: "trail" });
  return res.json({
    message: "updated the professional experience",
    status: 200,
    updatedProfessionalExperience,
  });
};

const editResumeDeleteProfessionalExperience = async (req, res) => {
  var { professionalExperienceId, resumeId } = req.body;

  var existingResume;

  try {
    existingResume = await Resume.findOne({ _id: resumeId });
  } catch (err) {
    console.log(err);
  }
  console.log({ existingResume });

  var newProfessionalExperienceArray =
    existingResume.professionalExperiences.filter(
      (professionalExperience) =>
        professionalExperience._id != professionalExperienceId
    );

  // console.log({ newProfessionalExperienceArray });
  existingResume = {
    ...existingResume._doc,
    professionalExperiences: newProfessionalExperienceArray,
  };

  // console.log({ existingResume });

  var updatedProfessionalExperience;
  try {
    await ProfessionalExperience.deleteOne({ _id: professionalExperienceId });
  } catch (err) {
    console.log(err);
  }

  var updatedResume;

  try {
    updatedResume = await Resume.findByIdAndUpdate(
      { _id: resumeId },
      existingResume,
      { new: true }
    ).populate("professionalExperiences");
  } catch (err) {
    console.log(err);
  }
  // console.log({ updatedResume });
  return res.json({
    updatedResume,
    message: "deleted the professional experience",
    status: 200,
  });
};

exports.createResume = createResume;
exports.getResumes = getResumes;
exports.getResumeById = getResumeById;
exports.editResumeNameDetails = editResumeNameDetails;
exports.editResumeProfileDescription = editResumeProfileDescription;
exports.editResumeAddProfessionalExperience =
  editResumeAddProfessionalExperience;
exports.editResumeEditProfessionalExperience =
  editResumeEditProfessionalExperience;
exports.editResumeDeleteProfessionalExperience =
  editResumeDeleteProfessionalExperience;
