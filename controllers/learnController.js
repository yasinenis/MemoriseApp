import Word from '../models/Word.js';
export async function getLearnPage(req, res) {
  try {
    const wordNeedStudy = await Word.findOne({
      user: req.session.userID,
      progress: 0,
    }).populate('category');

    res.status(200).render('learn', { wordNeedStudy });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
}

export async function rememberedWord(req, res) {
  try {
    const word = await Word.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.session.userID,
      },
      {
        $inc: { progress: 1 },
      }
    );

    res.status(200).redirect('/learn');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error: error.message,
    });
  }
}

export async function forgotWord(req, res) {
  try {
    const word = await Word.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.session.userID,
        progress: { $gt: 0 },
      },
      {
        $inc: { progress: -1 },
      }
    );

    res.status(200).redirect('/learn');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error: error.message,
    });
  }
}
