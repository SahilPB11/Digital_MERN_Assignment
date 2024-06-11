import express from "express";
import {
  getCompanies,
  addCompany,
  updateCompany,
  deleteCompany,
} from "../controllers/companyController.js";

const router = express.Router();

router.get("/", getCompanies);
router.post("/", addCompany);
router.put("/:id", updateCompany);
router.delete("/:id", deleteCompany);

export default router;
