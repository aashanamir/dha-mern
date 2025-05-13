import mongoose from "mongoose";

const TypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

export const Type = mongoose.model("Type", TypeSchema);