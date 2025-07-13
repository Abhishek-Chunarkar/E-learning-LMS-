import { Category } from "../../models/category.model.js";

// Create a new category
export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Category name is required"
            });
        }
        
        // Check if category already exists
        const existingCategory = await Category.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: "Category already exists"
            });
        }
        
        // Create new category
        const category = await Category.create({
            name,
            createdBy: req.id,
            creatorType: 'Admin'
        });
        
        res.status(201).json({
            success: true,
            message: "Category created successfully",
            category
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to create category"
        });
    }
};

// Get all categories
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ name: 1 });
        
        res.status(200).json({
            success: true,
            categories
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch categories"
        });
    }
};

// Delete category
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        
        const category = await Category.findByIdAndDelete(id);
        
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }
        
        res.status(200).json({
            success: true,
            message: "Category deleted successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to delete category"
        });
    }
}; 