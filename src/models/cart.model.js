/*
 * Mongoose schema and model for shopping carts. Each cart document
 * contains an array of items referencing product documents by
 * product_id. The user_id field links back to a user stored in
 * PostgreSQL; numbers are used to align with the `id_user` column.
 */

const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    product_id: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false },
);

const cartSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    user_id: {
      type: Number,
      required: true,
    },
    items: [itemSchema],
    updated_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('Cart', cartSchema);