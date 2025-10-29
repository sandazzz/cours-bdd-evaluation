/*
 * Mongoose schema and model for products. Products store flexible
 * attribute information and reference their category via `category_id`.
 */

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    brand: {
      type: String,
      trim: true,
    },
    category_id: {
      type: String,
      ref: 'Category',
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
    },
    images: [String],
    // attributes is left flexible to accommodate arbitrary product
    // specifications, e.g. different sizes or colors per category.
    attributes: {
      type: mongoose.Schema.Types.Mixed,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('Product', productSchema);