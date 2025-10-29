/*
 * Mongoose schema and model for product reviews. Each review
 * references a user (via `user_id`) and a product (via `product_id`),
 * and stores a numeric rating as well as an optional comment.
 */

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    user_id: {
      type: Number,
      required: true,
    },
    product_id: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
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

module.exports = mongoose.model('Review', reviewSchema);