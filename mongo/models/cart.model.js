import mongoose from 'mongoose';

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

export default mongoose.model('Cart', cartSchema);