import mongoose from "mongoose";

const BathroomsSchema = new mongoose.Schema({
  count: {
    type: Number,
    required: true,
    min: 1,
    unique: true
  }
});

export const Bathrooms = mongoose.model("Bathrooms", BathroomsSchema);