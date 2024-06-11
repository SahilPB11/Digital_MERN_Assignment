import Company from "../Model/Company.js";
import xlsx from "xlsx";
import ErrorHandler from "../utils/ErrorHandler.js";

export const getCompanies = async (req, res, next) => {
  const { search } = req.query;
  try {
    let companies;
    if (search) {
      companies = await Company.find({
        $or: [
          { name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      });
    } else {
      companies = await Company.find();
    }
    res.json(companies);
  } catch (error) {
    next(error);
  }
};

export const addCompany = async (req, res, next) => {
  const { name, description } = req.body;
  try {
    const company = new Company({ name, description });
    const savedCompany = await company.save();
    res.status(201).json(savedCompany);
  } catch (error) {
    next(error);
  }
};

export const updateCompany = async (req, res, next) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const company = await Company.findById(id);
    if (company) {
      company.name = name;
      company.description = description;
      const updatedCompany = await company.save();
      res.json(updatedCompany);
    } else {
      return next(new ErrorHandler("Company not found", 404));
    }
  } catch (error) {
    next(error);
  }
};

export const deleteCompany = async (req, res, next) => {
  const { id } = req.params;
  try {
    const company = await Company.findById(id);
    if (company) {
      await company.deleteOne();
      res.json({ message: "Company removed" });
    } else {
      return next(new ErrorHandler("Company not found", 404));
    }
  } catch (error) {
    next(error);
  }
};

export const bulkAddCompanies = async (req, res, next) => {
  const file = req.file;
  try {
    const workbook = xlsx.readFile(file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const companies = xlsx.utils.sheet_to_json(sheet);

    await Company.insertMany(companies);
    res.status(201).json({ message: "Companies added successfully" });
  } catch (error) {
    next(error);
  }
};
