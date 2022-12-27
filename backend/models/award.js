const mongoose = require("mongoose");

const awardsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  issuedDate: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("Award", awardsSchema);
