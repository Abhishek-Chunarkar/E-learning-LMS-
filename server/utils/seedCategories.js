import { Category } from "../models/category.model.js";

const defaultCategories = [
  "Next JS",
  "Data Science",
  "Frontend Development",
  "Fullstack Development",
  "MERN Stack Development",
  "Javascript",
  "Python",
  "Docker",
  "MongoDB",
  "HTML",
  "Java"
];

export const seedCategories = async () => {
  try {
    console.log("Checking for default categories...");
    
    // Check how many default categories already exist
    for (const categoryName of defaultCategories) {
      const existingCategory = await Category.findOne({ 
        name: { $regex: new RegExp(`^${categoryName}$`, 'i') } 
      });
      
      if (!existingCategory) {
        // Create the missing category
        await Category.create({
          name: categoryName,
          creatorType: "Admin"
        });
        console.log(`Default category created: ${categoryName}`);
      }
    }
    
    console.log("Default categories check complete");
  } catch (error) {
    console.error("Error seeding default categories:", error);
  }
}; 