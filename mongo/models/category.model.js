import mongoose from 'mongoose';

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

export default mongoose.model('Category', categorySchema);