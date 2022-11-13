const mongoose = require("mongoose");

const professionalExperienceSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  employer: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: false },
  location: { type: String, required: true },
});

module.exports = mongoose.model(
  "ProfessionalExperience",
  professionalExperienceSchema
);
