//models
const Resume = require("../models/resume");
const User = require("../models/user");
const ProfessionalExperience = require("../models/professionalExperience");
const Skill = require("../models/skill");
const Education = require("../models/education");
const Project = require("../models/project");
const Award = require("../models/award");
const Certificate = require("../models/certificate");

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
    // resume = await Resume.findOne({ _id: resumeId }).populate(
    //   "professionalExperiences"
    // );
    resume = await Resume.findOne({ _id: resumeId }).populate([
      "professionalExperiences",
      "skills",
      "education",
      "projects",
      "awards",
    ]);
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

//professional experience
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

  console.log({ b: req.body });

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
  var updatedProfessionalExperience;
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

  var existingResume;

  try {
    existingResume = await Resume.findOne({ _id: resumeId }).populate(
      "professionalExperiences"
    );
  } catch (err) {
    console.log(err);
  }

  console.log({ existingResume });

  return res.json({
    message: "updated the professional experience",
    status: 200,
    updatedProfessionalExperience,
    updatedResume: existingResume,
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

//skills

const editResumeAddSkill = async (req, res) => {
  var { skillName, skillLevel, resumeId } = req.body;

  var existingResume;

  try {
    existingResume = await Resume.findOne({ _id: resumeId });
  } catch (err) {
    console.log(err);
  }

  var newSkill = new Skill({
    skillName,
    skillLevel,
  });

  try {
    newSkill = await newSkill.save();
  } catch (err) {
    console.log(err);
  }

  existingResume.skills = [...existingResume.skills, newSkill];

  var updatedResume;

  try {
    updatedResume = await Resume.findByIdAndUpdate(
      { _id: resumeId },
      existingResume,
      { new: true }
    ).populate("skills");
  } catch (err) {
    console.log(err);
  }

  return res.json({
    status: 200,
    message: "Added skills",
    updatedResume: updatedResume,
  });
};

const editResumeEditSkill = async (req, res) => {
  var { skillName, skillLevel, resumeId, skillId } = req.body;

  var existingSkill;

  try {
    existingSkill = await Skill.findOne({
      _id: skillId,
    });
  } catch (err) {
    console.log(err);
  }

  existingSkill = {
    ...existingSkill._doc,
    skillName,
    skillLevel,
  };

  var updatedSkill;

  try {
    updatedSkill = await Skill.findByIdAndUpdate(
      { _id: skillId },
      existingSkill,
      { new: true }
    );
  } catch (err) {
    console.log(err);
  }

  console.log({ updatedSkill });

  var existingResume;

  try {
    existingResume = await Resume.findOne({ _id: resumeId }).populate("skills");
  } catch (err) {
    console.log(err);
  }

  console.log({ existingResume });

  return res.json({
    message: "updated the skill ",
    status: 200,
    updatedSkill,
    updatedResume: existingResume,
  });
};

const editResumeDeleteSkill = async (req, res) => {
  var { skillId, resumeId } = req.body;

  var existingResume;

  try {
    existingResume = await Resume.findOne({ _id: resumeId });
  } catch (err) {
    console.log(err);
  }

  var newSkillArray = existingResume.skills.filter(
    (skill) => skill._id != skillId
  );

  existingResume = {
    ...existingResume._doc,
    skills: newSkillArray,
  };

  var updatedSkill;
  try {
    await Skill.deleteOne({ _id: skillId });
  } catch (err) {
    console.log(err);
  }

  var updatedResume;

  try {
    updatedResume = await Resume.findByIdAndUpdate(
      { _id: resumeId },
      existingResume,
      { new: true }
    ).populate("skills");
  } catch (err) {
    console.log(err);
  }

  console.log({ updatedResume });

  return res.json({
    updatedResume,
    message: "deleted the skill",
    status: 200,
  });
};

//education

const editResumeAddEducation = async (req, res) => {
  var { degree, school, location, description, startDate, endDate, resumeId } =
    req.body;

  var existingResume;

  try {
    existingResume = await Resume.findOne({ _id: resumeId });
  } catch (err) {
    console.log(err);
  }

  var newEducation = new Education({
    degree,
    school,
    location,
    description,
    startDate,
    endDate,
  });

  try {
    newEducation = await newEducation.save();
  } catch (err) {
    console.log(err);
  }

  existingResume.education = [...existingResume.education, newEducation];

  var updatedResume;

  try {
    updatedResume = await Resume.findByIdAndUpdate(
      { _id: resumeId },
      existingResume,
      { new: true }
    ).populate("education");
  } catch (err) {
    console.log(err);
  }

  return res.json({
    status: 200,
    message: "Added education",
    updatedResume: updatedResume,
  });
};

const editResumeEditEducation = async (req, res) => {
  var {
    degree,
    school,
    location,
    description,
    startDate,
    endDate,
    resumeId,
    educationId,
  } = req.body;

  // console.log({ b: req.body });

  var existingEducation;

  try {
    existingEducation = await Education.findOne({
      _id: educationId,
    });
  } catch (err) {
    console.log(err);
  }

  existingEducation = {
    ...existingEducation._doc,
    degree,
    school,
    location,
    description,
    startDate,
    endDate,
  };

  var updatedEducation;
  try {
    updatedEducation = await Education.findByIdAndUpdate(
      { _id: educationId },
      existingEducation,
      { new: true }
    );
  } catch (err) {
    console.log(err);
  }

  console.log({ updatedEducation });

  var existingResume;

  try {
    existingResume = await Resume.findOne({ _id: resumeId }).populate(
      "education"
    );
  } catch (err) {
    console.log(err);
  }

  console.log({ existingResume });

  return res.json({
    message: "updated the education",
    status: 200,
    updatedEducation,
    updatedResume: existingResume,
  });
};

const editResumeDeleteEducation = async (req, res) => {
  var { educationId, resumeId } = req.body;

  var existingResume;

  try {
    existingResume = await Resume.findOne({ _id: resumeId });
  } catch (err) {
    console.log(err);
  }
  console.log({ existingResume });

  var newEducationArray = existingResume.education.filter(
    (education) => education._id != educationId
  );

  // console.log({ newProfessionalExperienceArray });
  existingResume = {
    ...existingResume._doc,
    education: newEducationArray,
  };

  // console.log({ existingResume });

  var updatedEducation;
  try {
    await Education.deleteOne({ _id: educationId });
  } catch (err) {
    console.log(err);
  }

  var updatedResume;

  try {
    updatedResume = await Resume.findByIdAndUpdate(
      { _id: resumeId },
      existingResume,
      { new: true }
    ).populate("education");
  } catch (err) {
    console.log(err);
  }
  // console.log({ updatedResume });
  return res.json({
    updatedResume,
    message: "deleted the education",
    status: 200,
  });
};

//projects
const editResumeAddProject = async (req, res) => {
  var { title, subTitle, link, startDate, endDate, description, resumeId } =
    req.body;

  var existingResume;

  try {
    existingResume = await Resume.findOne({ _id: resumeId });
  } catch (err) {
    console.log(err);
  }

  var newProject = new Project({
    title,
    subTitle,
    link,
    startDate,
    endDate,
    description,
  });

  try {
    newProject = await newProject.save();
  } catch (err) {
    console.log(err);
  }

  existingResume.projects = [...existingResume.projects, newProject];

  var updatedResume;

  try {
    updatedResume = await Resume.findByIdAndUpdate(
      { _id: resumeId },
      existingResume,
      { new: true }
    ).populate("projects");
  } catch (err) {
    console.log(err);
  }

  return res.json({
    status: 200,
    message: "Added project",
    updatedResume: updatedResume,
  });
};

const editResumeEditProject = async (req, res) => {
  var {
    title,
    subTitle,
    link,
    startDate,
    endDate,
    description,
    projectId,
    resumeId,
  } = req.body;

  // console.log({ b: req.body });

  var existingProject;

  try {
    existingProject = await Project.findOne({
      _id: projectId,
    });
  } catch (err) {
    console.log(err);
  }

  existingProject = {
    ...existingProject._doc,
    title,
    subTitle,
    link,
    startDate,
    endDate,
    description,
  };

  var updatedProject;
  try {
    updatedProject = await Project.findByIdAndUpdate(
      { _id: projectId },
      existingProject,
      { new: true }
    );
  } catch (err) {
    console.log(err);
  }

  console.log({ updatedProject });

  var existingResume;

  try {
    existingResume = await Resume.findOne({ _id: resumeId }).populate(
      "projects"
    );
  } catch (err) {
    console.log(err);
  }

  console.log({ existingResume });

  return res.json({
    message: "updated the project",
    status: 200,
    updatedProject,
    updatedResume: existingResume,
  });
};

const editResumeDeleteProject = async (req, res) => {
  var { projectId, resumeId } = req.body;

  var existingResume;

  try {
    existingResume = await Resume.findOne({ _id: resumeId });
  } catch (err) {
    console.log(err);
  }
  console.log({ existingResume });

  var newProjectsArray = existingResume.projects.filter(
    (project) => project._id != projectId
  );

  // console.log({ newProfessionalExperienceArray });
  existingResume = {
    ...existingResume._doc,
    projects: newProjectsArray,
  };

  // console.log({ existingResume });

  var updatedProject;
  try {
    await Project.deleteOne({ _id: projectId });
  } catch (err) {
    console.log(err);
  }

  var updatedResume;

  try {
    updatedResume = await Resume.findByIdAndUpdate(
      { _id: resumeId },
      existingResume,
      { new: true }
    ).populate("projects");
  } catch (err) {
    console.log(err);
  }
  // console.log({ updatedResume });
  return res.json({
    updatedResume,
    message: "deleted the project",
    status: 200,
  });
};

//awards
const editResumeAddAward = async (req, res) => {
  var { title, issuer, issuedDate, description, resumeId } = req.body;

  var existingResume;

  try {
    existingResume = await Resume.findOne({ _id: resumeId });
  } catch (err) {
    console.log(err);
  }

  var newAward = new Award({
    title,
    issuer,
    issuedDate,
    description,
  });

  try {
    newAward = await newAward.save();
  } catch (err) {
    console.log(err);
  }

  existingResume.awards = [...existingResume.awards, newAward];

  var updatedResume;

  try {
    updatedResume = await Resume.findByIdAndUpdate(
      { _id: resumeId },
      existingResume,
      { new: true }
    ).populate("awards");
  } catch (err) {
    console.log(err);
  }

  return res.json({
    status: 200,
    message: "Added award",
    updatedResume: updatedResume,
  });
};

const editResumeEditAward = async (req, res) => {
  var { title, issuer, issuedDate, description, awardId, resumeId } = req.body;

  // console.log({ b: req.body });

  var existingAward;

  try {
    existingAward = await Award.findOne({
      _id: awardId,
    });
  } catch (err) {
    console.log(err);
  }

  existingAward = {
    ...existingAward._doc,
    title,
    issuer,
    issuedDate,
    description,
  };

  var updatedAward;
  try {
    updatedAward = await Award.findByIdAndUpdate(
      { _id: awardId },
      existingAward,
      { new: true }
    );
  } catch (err) {
    console.log(err);
  }

  console.log({ updatedAward });

  var existingResume;

  try {
    existingResume = await Resume.findOne({ _id: resumeId }).populate("awards");
  } catch (err) {
    console.log(err);
  }

  console.log({ existingResume });

  return res.json({
    message: "updated the award",
    status: 200,
    updatedAward,
    updatedResume: existingResume,
  });
};

const editResumeDeleteAward = async (req, res) => {
  var { awardId, resumeId } = req.body;

  var existingResume;

  try {
    existingResume = await Resume.findOne({ _id: resumeId });
  } catch (err) {
    console.log(err);
  }
  console.log({ existingResume });

  var newAwardsArray = existingResume.awards.filter(
    (award) => award._id != awardId
  );

  // console.log({ newProfessionalExperienceArray });
  existingResume = {
    ...existingResume._doc,
    awards: newAwardsArray,
  };

  // console.log({ existingResume });

  var updatedAward;
  try {
    await Award.deleteOne({ _id: awardId });
  } catch (err) {
    console.log(err);
  }

  var updatedResume;

  try {
    updatedResume = await Resume.findByIdAndUpdate(
      { _id: resumeId },
      existingResume,
      { new: true }
    ).populate("awards");
  } catch (err) {
    console.log(err);
  }
  // console.log({ updatedResume });
  return res.json({
    updatedResume,
    message: "deleted the award",
    status: 200,
  });
};

//certificates
const editResumeAddCertificate = async (req, res) => {
  var { title, link, description, resumeId } = req.body;

  var existingResume;

  try {
    existingResume = await Resume.findOne({ _id: resumeId });
  } catch (err) {
    console.log(err);
  }

  var newCertificate = new Award({
    title,
    link,
    description,
  });

  try {
    newCertificate = await newCertificate.save();
  } catch (err) {
    console.log(err);
  }

  existingResume.certificates = [
    ...existingResume.certificates,
    newCertificate,
  ];

  var updatedResume;

  try {
    updatedResume = await Resume.findByIdAndUpdate(
      { _id: resumeId },
      existingResume,
      { new: true }
    ).populate("certificates");
  } catch (err) {
    console.log(err);
  }

  return res.json({
    status: 200,
    message: "Added certificate",
    updatedResume: updatedResume,
  });
};

const editResumeEditCertificate = async (req, res) => {
  var { title, link, description, certificateId, resumeId } = req.body;

  // console.log({ b: req.body });

  var existingCertificate;

  try {
    existingCertificate = await Certificate.findOne({
      _id: certificateId,
    });
  } catch (err) {
    console.log(err);
  }

  existingCertificate = {
    ...existingCertificate._doc,
    title,
    link,
    description,
  };

  var updatedCertificate;
  try {
    updatedCertificate = await Certificate.findByIdAndUpdate(
      { _id: certificateId },
      existingCertificate,
      { new: true }
    );
  } catch (err) {
    console.log(err);
  }

  console.log({ updatedCertificate });

  var existingResume;

  try {
    existingResume = await Resume.findOne({ _id: resumeId }).populate(
      "certificates"
    );
  } catch (err) {
    console.log(err);
  }

  console.log({ existingResume });

  return res.json({
    message: "updated the certificate",
    status: 200,
    updatedCertificate,
    updatedResume: existingResume,
  });
};

const editResumeDeleteCertificate = async (req, res) => {
  var { certificateId, resumeId } = req.body;

  var existingResume;

  try {
    existingResume = await Resume.findOne({ _id: resumeId });
  } catch (err) {
    console.log(err);
  }
  console.log({ existingResume });

  var newCertificatesArray = existingResume.certificates.filter(
    (certificate) => certificate._id != certificateId
  );

  // console.log({ newProfessionalExperienceArray });
  existingResume = {
    ...existingResume._doc,
    certificates: newCertificatesArray,
  };

  // console.log({ existingResume });

  var updatedCertificate;
  try {
    await Certificate.deleteOne({ _id: certificateId });
  } catch (err) {
    console.log(err);
  }

  var updatedResume;

  try {
    updatedResume = await Resume.findByIdAndUpdate(
      { _id: resumeId },
      existingResume,
      { new: true }
    ).populate("certificates");
  } catch (err) {
    console.log(err);
  }
  // console.log({ updatedResume });
  return res.json({
    updatedResume,
    message: "deleted the certificate",
    status: 200,
  });
};

//EXPORTS

//resume
exports.createResume = createResume;
exports.getResumes = getResumes;
exports.getResumeById = getResumeById;

//name details
exports.editResumeNameDetails = editResumeNameDetails;

//professional description
exports.editResumeProfileDescription = editResumeProfileDescription;

//professional experience
exports.editResumeAddProfessionalExperience =
  editResumeAddProfessionalExperience;
exports.editResumeEditProfessionalExperience =
  editResumeEditProfessionalExperience;
exports.editResumeDeleteProfessionalExperience =
  editResumeDeleteProfessionalExperience;

//skills
exports.editResumeAddSkill = editResumeAddSkill;
exports.editResumeEditSkill = editResumeEditSkill;
exports.editResumeDeleteSkill = editResumeDeleteSkill;

//education
exports.editResumeAddEducation = editResumeAddEducation;
exports.editResumeEditEducation = editResumeEditEducation;
exports.editResumeDeleteEducation = editResumeDeleteEducation;

//projects
exports.editResumeAddProject = editResumeAddProject;
exports.editResumeEditProject = editResumeEditProject;
exports.editResumeDeleteProject = editResumeDeleteProject;

//awards
exports.editResumeAddAward = editResumeAddAward;
exports.editResumeEditAward = editResumeEditAward;
exports.editResumeDeleteAward = editResumeDeleteAward;

//certificates
exports.editResumeAddCertificate = editResumeAddCertificate;
exports.editResumeEditCertificate = editResumeEditCertificate;
exports.editResumeDeleteCertificate = editResumeDeleteCertificate;
