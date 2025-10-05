import mongoose from 'mongoose';

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
  sentence: {
    type: String,
  },
  lastRemembered: {
    type: Date,
  },
  lastWrited: {
    type: Date,
  },
  written: {
    type: Boolean,
    default: false,
  },
  phonetics: {
    type: String,
  },
  rememberHistory: [
    {
      type: Date,
    },
  ],
  masteredHistory: [
    {
      type: Date,
    },
  ],
  writtenHistory: [
    {
      type: Date,
    },
  ],
  writeText: {
    type: String,
  },
  newAdded: {
    type: Boolean,
    default: true,
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

WordSchema.index({ word: 1, user: 1 }, { unique: true });

const Word = mongoose.model('Word', WordSchema);

export default Word;
