import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 200
  },
  description: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  currency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Currency",
  },
  price: {
    type: Number,
    required: true
  },
  isPriceEnabled: {
    type: Boolean,
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Type",
    required: true
  },
  purpose: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Purpose",
    required: true
  },
  bedrooms: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bedrooms",
    required: true
  },
  bathrooms: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bathrooms",
    required: true
  },
  area: {
    type: Number,
    required: true
  },
  label: {
    type: String,
    trim: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategory",
    required: true
  },
  images: {
    type: [String],
    required: true,
    validate: [arrayLimit, "At least one image is required"]
  },
  files: {
    type: String,
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  agent: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

// Validate images array length
function arrayLimit(val) {
  return val.length > 0;
}

export const Property = mongoose.model("Property", PropertySchema);