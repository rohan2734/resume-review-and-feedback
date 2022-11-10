const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  resumeName: { type: String, required: true },
  //candidate details
  //person details
  fullName: { type: String, required: false },
  jobTitle: { type: String, required: false },
  emailID: { type: String, required: false },
  location: { type: String, required: false },
  phoneNumber: { type: String, required: false },
  address: { type: String, required: false },
  gender: { type: String, required: false },
  profilePicURL: { type: String, required: false },
  //social links
  linkedinURL: { type: String, required: false },
  githubURL: { type: String, required: false },
  mediumURL: { type: String, required: false },
  websiteURL: { type: String, required: false },

  //profile details
  profileDescription: { type: String, required: false },
  //embedded objects
  professionalExperiences: [
    { type: mongoose.Schema.Types.ObjectId, ref: "ProfessionalExperience" },
  ],
  skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
  certificates: [{ type: mongoose.Schema.Types.ObjectId, ref: "Certificate" }],
  awards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Award" }],
  education: { type: mongoose.Schema.Types.ObjectId, ref: "Education" },
  languages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Language" }],

  //belongs to user
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Resume", resumeSchema);
