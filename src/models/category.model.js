/*
 * Mongoose schema and model for product categories. Categories are
 * simple documents keyed by a string `_id` and containing a name.
 */

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
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
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('Category', categorySchema);