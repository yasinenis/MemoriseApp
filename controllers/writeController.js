import mongoose from 'mongoose';
import Word from '../models/Word.js';

export async function getWritePage(req, res) {
  res.status(200).render('write');
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
