import mongoose from "mongoose";

const PurposeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

export const Purpose = mongoose.model("Purpose", PurposeSchema);