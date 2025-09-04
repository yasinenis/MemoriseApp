import Word from '../models/Word.js';
import mongoose from 'mongoose';
export async function getLearnPage(req, res) {
  try {
    /*
    const wordNeedStudy = await Word.findOne({
      user: req.session.userID,
      progress: 0,
    }).populate('category');
    */

    // progress 0

    const userId = new mongoose.Types.ObjectId(req.session.userID);

    const countZero = await Word.countDocuments({
      user: userId,
      progress: 0,
    });

    const progressZero = await Word.aggregate([
      { $match: { user: userId, progress: 0 } },
      { $sample: { size: countZero } },
    ]);

    let wordsZero = [];

    if (progressZero.length > 0) {
      wordsZero = await Word.find({
        _id: { $in: progressZero.map((w) => w._id) },
      }).populate('category');
    }

    // progress 1

    //const oneDay = 1000 * 60 * 60 * 24;
    const oneDay = 1000 * 60 * 1;
    const requiredDays = 1;

    const countOne = await Word.countDocuments({
      user: userId,
      progress: 1,
      lastRemembered: { $lte: new Date(Date.now() - requiredDays * oneDay) },
    });

    const progressOne = await Word.aggregate([
      {
        $match: {
          user: userId,
          progress: 1,
          lastRemembered: {
            $lte: new Date(Date.now() - requiredDays * oneDay),
          },
        },
      },
      { $sample: { size: countOne } },
    ]);

    let wordsOne = [];

    if (progressOne.length > 0) {
      wordsOne = await Word.find({
        _id: { $in: progressOne.map((w) => w._id) },
      }).populate('category');
    }

    // end of progresses
    const wordsNeedStudy = [...wordsZero, ...wordsOne];

    res.status(200).render('learn', { wordsNeedStudy });
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
      },
      {
        $inc: { progress: 1 },
        $set: { lastRemembered: new Date() },
      }
    );
    console.log('tuşa basıldı');
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
