import Word from '../models/Word.js';
import mongoose from 'mongoose';

export async function isThereEvenOneWord(req, res) {
  try {
    const word = await Word.findOne({ user: req.session.userID });

    const isThereEvenOneWord = !!word;
    res.status(200).json({ isThereEvenOneWord });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      err,
    });
  }
}

export async function getWordsByProgress(
  userId,
  progress,
  requiredDays,
  oneDay
) {
  if (progress == 0) {
    const countProgressZero = await Word.countDocuments({
      user: userId,
      progress,
    });

    const progressZeroDocs = await Word.aggregate([
      { $match: { user: userId, progress } },
      { $sample: { size: countProgressZero } },
    ]);

    if (progressZeroDocs.length > 0) {
      return await Word.find({
        _id: { $in: progressZeroDocs.map((w) => w._id) },
      }).populate('category');
    }
    return [];
  }

  const count = await Word.countDocuments({
    user: userId,
    progress,
    lastRemembered: { $lte: new Date(Date.now() - requiredDays * oneDay) },
  });

  const progressDocs = await Word.aggregate([
    {
      $match: {
        user: userId,
        progress,
        lastRemembered: {
          $lte: new Date(Date.now() - requiredDays * oneDay),
        },
      },
    },
    { $sample: { size: count } },
  ]);

  if (progressDocs.length > 0) {
    return await Word.find({
      _id: { $in: progressDocs.map((w) => w._id) },
    }).populate('category');
  }
  return [];
}

export async function getWordsNeedLearn(req, res) {
  try {
    const userId = new mongoose.Types.ObjectId(req.session.userID);

    const oneDay = 1000 * 60 * 60 * 24;
    // const oneMins = 1000 * 60 * 1;

    // progress 0 --------------------new------------------------------
    const wordsZero = await getWordsByProgress(userId, 0, 0, oneDay);
    // progress 1 ------------------------------------------------------
    const wordsOne = await getWordsByProgress(userId, 1, 1, oneDay);
    // progress 2 ------------------------------------------------------
    const wordsTwo = await getWordsByProgress(userId, 2, 2, oneDay);
    // progress 3 ------------------------------------------------------
    const wordsThree = await getWordsByProgress(userId, 3, 4, oneDay);
    // progress 4 ------------------------------------------------------
    const wordsFour = await getWordsByProgress(userId, 4, 8, oneDay);
    // progress 5 --------------------master----------------------------
    const wordsFive = await getWordsByProgress(userId, 5, 16, oneDay);
    // progress 6 ------------------------------------------------------
    const wordsSix = await getWordsByProgress(userId, 6, 32, oneDay);
    // progress 7 ------------------------------------------------------
    const wordsSeven = await getWordsByProgress(userId, 7, 64, oneDay);
    // progress 8 ------------------------------------------------------
    const wordsEight = await getWordsByProgress(userId, 8, 128, oneDay);
    // progress 9 ------------------------------------------------------
    const wordsNine = await getWordsByProgress(userId, 9, 256, oneDay);
    // progress 10 ------------------------------------------------------
    const wordsTen = await getWordsByProgress(userId, 10, 512, oneDay);

    // end of progresses
    const wordsNeedStudy = [
      ...wordsZero,
      ...wordsOne,
      ...wordsTwo,
      ...wordsThree,
      ...wordsFour,
      ...wordsFive,
      ...wordsSix,
      ...wordsSeven,
      ...wordsEight,
      ...wordsNine,
      ...wordsTen,
    ];

    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    shuffle(wordsNeedStudy);

    res.status(200).json(wordsNeedStudy);
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err: err.message,
    });
  }
}

export async function getLearnPage(req, res) {
  try {
    res.status(200).render('learn', { pageName: 'learn' });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error: error.message,
    });
  }
}

export async function rememberedWord(req, res) {
  try {
    const word = await Word.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.session.userID,
        progress: { $gte: 0, $lte: 4 },
      },
      {
        $inc: { progress: 1 },
        $set: { lastRemembered: new Date() },
        $push: { rememberHistory: new Date() },
      }
    );

    if (!word) {
      const mastered = await Word.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.session.userID,
          progress: { $gte: 5, $lte: 10 },
        },
        {
          $inc: { progress: 1 },
          $set: { lastRemembered: new Date() },
          $push: { masteredHistory: new Date() },
        }
      );
    }

    res.status(200).json({ status: 'success' });
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
    res.status(200).json({ status: 'success' });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error: error.message,
    });
  }
}
