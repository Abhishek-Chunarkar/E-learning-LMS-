import express from "express";
import { getAllCategories } from "../controllers/admin/category.controller.js";

const router = express.Router();

// Get all categories - Public
router.get("/", getAllCategories);

export default router; 