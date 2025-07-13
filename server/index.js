import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import adminRoute from "./routes/admin/admin.route.js";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";
import adminPurchaseRoute from "./routes/admin/purchaseCourse.route.js"
import courseProgressRoute from "./routes/courseProgress.route.js";
import admincourseRoute from "./routes/admin/course.route.js";
import adminmediaRoute from "./routes/admin/media.route.js";
import admincourseProgressRoute from "./routes/admin/courseProgress.route.js";
import categoryRoute from "./routes/category.route.js";
import adminCategoryRoute from "./routes/admin/category.route.js";
import { seedCategories } from "./utils/seedCategories.js";


dotenv.config({});

// call database connection here
connectDB();
const app = express();

const PORT = process.env.PORT || 3000;

// default middleware
app.use(express.json());
app.use(cookieParser());

// Allow more flexible CORS for development
app.use(cors({
    origin: function(origin, callback) {
        // Allow requests with no origin (like mobile apps, curl requests)
        if (!origin) return callback(null, true);
        
        // Check if the origin is allowed
        const allowedOrigins = [
            'http://localhost:5173',
            'http://localhost:5174',
            'http://localhost:5175',
            'http://localhost:5176',
            'http://localhost:5177',
            'http://localhost:5178',
            'http://localhost:5179',
            'http://localhost:5180',
            // Add any other origin you want to allow
        ];
        
        if (allowedOrigins.indexOf(origin) !== -1 || origin.startsWith('http://localhost:')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
 
// apis
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);
app.use("/api/v1/category", categoryRoute);
//admin api
app.use("/api/v1/media", adminmediaRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/course", admincourseRoute);
app.use("/api/v1/purchase", adminPurchaseRoute);
app.use("/api/v1/progress", admincourseProgressRoute);
app.use("/api/v1/category", adminCategoryRoute);
 
// Seed default categories
seedCategories();
 
app.listen(PORT, () => {
    console.log(`Server listen at port ${PORT}`);
})


