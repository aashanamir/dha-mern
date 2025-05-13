import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    maxLength: 100
  },
  image: {
    type: String,
    required: true
  }
});

export const Category = mongoose.model("Category", CategorySchema);