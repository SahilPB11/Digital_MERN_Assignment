import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  // Add other fields as required
});

const Company = mongoose.model("Company", companySchema);

export default Company;
