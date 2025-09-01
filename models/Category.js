import { _arrayUnique } from 'chart.js/helpers';
import mongoose from 'mongoose';

import slugify from 'slugify';

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
  },
  slug: {
    type: String,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

CategorySchema.pre('validate', function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
  next();
});

CategorySchema.index({ slug: 1, user: 1 }, { unique: true });

const Category = mongoose.model('Category', CategorySchema);

export default Category;
