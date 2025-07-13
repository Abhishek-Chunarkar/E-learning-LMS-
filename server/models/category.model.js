import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'creatorType'
    },
    creatorType: {
        type: String,
        enum: ['User', 'Admin'],
        default: 'Admin'
    }
}, {timestamps: true});

export const Category = mongoose.model("Category", categorySchema); 