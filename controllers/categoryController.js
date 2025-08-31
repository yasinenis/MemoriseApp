import Category from '../models/Category.js';
import Word from '../models/Word.js';

export async function createCategory(req, res) {
  const category = await Category.create({
    name: req.body.name,
    user: req.session.userID,
  });

  try {
    res.status(201).redirect('/words');
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    });
  }
}

export async function deleteCategory(req, res) {
  try {
    const newCategoryName = await Category.findOne({
      name: 'Uncategorized',
      user: req.session.userID,
    });

    const oldCategoryId = req.params.id;

    const category = await Category.findOneAndDelete({
      _id: req.params.id,
      user: req.session.userID,
    });

    if (!newCategoryName) {
      return res.status(404).json({
        status: 'fail',
        message: 'Unauthorized category did not found!',
      });
    }

    await Word.updateMany(
      { category: oldCategoryId, user: req.session.userID },
      { $set: { category: newCategoryName._id } }
    );

    if (!category) {
      return res
        .status(403)
        .json({ error: 'Not authorized or word not found' });
    }

    res.status(200).redirect('/words');
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err: err.message,
    });
  }
}

export async function editCategory(req, res) {
  try {
    const category = await Category.findOne({
      _id: req.params.id,
      user: req.session.userID,
    });

    if (!category) {
      return res
        .status(403)
        .json({ error: 'Not authorized or category not found' });
    }

    category.name = req.body.name;
    await category.save();
    res.status(200).redirect('/words');
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      error: err.message,
    });
  }
}
