import mongoose from "mongoose";

const BedroomsSchema = new mongoose.Schema({
  count: {
    type: Number,
    required: true,
    min: 1,
    unique: true
  }
});

export const Bedrooms = mongoose.model("Bedrooms", BedroomsSchema);