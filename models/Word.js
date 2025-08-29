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
  phonetics: {
    type: String,
  },
  /*
  lists: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lists',
  },
  */
});

const Word = mongoose.model('Word', WordSchema);

export default Word;
