import mongoose from "mongoose";

const CurrencySchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },  
});

export const Currency = mongoose.model("Currency", CurrencySchema);