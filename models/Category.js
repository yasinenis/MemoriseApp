import { _arrayUnique } from 'chart.js/helpers';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    default: 'Uncategorized',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Category = mongoose.model('Category', CategorySchema);

export default Category;
