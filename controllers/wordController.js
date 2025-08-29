import Word from '../models/Word.js';

export async function getWordsPage(req, res) {
  const words = await Word.find().sort('-createdAt');
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
