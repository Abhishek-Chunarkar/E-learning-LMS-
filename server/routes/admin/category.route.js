import express from "express";
import { createCategory, deleteCategory, getAllCategories } from "../../controllers/admin/category.controller.js";
import isAuthenticated from "../../middlewares/admin/isAuthenticated.js";

const router = express.Router();

// Create a new category - Admin only
router.post("/create", isAuthenticated, createCategory);

// Get all categories - Public
router.get("/", getAllCategories);

// Delete category - Admin only
router.delete("/:id", isAuthenticated, deleteCategory);

export default router; 