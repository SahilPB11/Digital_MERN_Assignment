import express from "express";
import multer from "multer";
import {
  getCompanies,
  addCompany,
  updateCompany,
  deleteCompany,
  bulkAddCompanies,
} from "../Controller/company_controller.js";

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.get("/", getCompanies);
router.post("/", addCompany);
router.put("/:id", updateCompany);
router.delete("/:id", deleteCompany);
router.post("/bulk-upload", upload.single("file"), bulkAddCompanies);

export default router;
