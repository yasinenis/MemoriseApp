import Word from '../models/Word.js';

export async function getWordsPage(req, res) {
  const words = await Word.find().sort('-createdAt').populate('category');
  try {
    res.status(200).render('words', {
      words,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    });
  }
}

export async function createWord(req, res) {
  const word = await Word.create(req.body);
  try {
    res.status(201).redirect('/words');
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    });
  }
}

export async function deleteWord(req, res) {
  try {
    const word = await Word.findOneAndDelete({ _id: req.params.id });
    res.status(201).redirect('/words');
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    });
  }
}

export async function editWord(req, res) {
  try {
    const word = await Word.findOne({ _id: req.params.id });
    word.word = req.body.word;
    word.meaning = req.body.meaning;
    word.partOfSpeech = req.body.partOfSpeech;
    word.phonetics = req.body.phonetics;
    await word.save();
    res.status(201).redirect('/words');
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      error: err.message,
    });
  }
}
