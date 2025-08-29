import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ListsSchema = new Schema({
  list: {
    type: String,
    required: true,
  },
});

const Lists = mongoose.model('Lists', ListsSchema);

export default Lists;
