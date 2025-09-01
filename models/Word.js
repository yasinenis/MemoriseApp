import mongoose from 'mongoose';

import slugify from 'slugify';

const Schema = mongoose.Schema;

const WordSchema = new Schema({
  word: {
    type: String,
    required: true,
  },
  meaning: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  partOfSpeech: {
    type: String,
  },
  progress: {
    type: Number,
    default: 0,
  },
  phonetics: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
});

const Word = mongoose.model('Word', WordSchema);

export default Word;
