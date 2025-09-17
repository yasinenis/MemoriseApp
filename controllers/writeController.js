import Word from '../models/Word.js';

export async function getWritePage(req, res) {
  res.status(200).render('write', { pageName: 'write' });
}

export async function getWriteWords(req, res) {
  try {
    const randomWords = await Word.find({
      user: req.session.userID,
      written: false,
    }).populate('category');
    res.status(200).json(randomWords);
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error: error.message,
    });
  }
}

export async function saveWriteArticle(req, res) {
  try {
    const wordId = req.params.id;
    const userText = req.body.write;
    const writtenWord = await Word.findOne({
      _id: wordId,
      user: req.session.userID,
    });

    writtenWord.writeText = userText;
    writtenWord.written = true;
    writtenWord.writtenHistory = new Date();

    await writtenWord.save();

    res.status(200).redirect('/write');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error: error.message,
    });
  }
}
