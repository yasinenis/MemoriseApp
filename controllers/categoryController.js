import Category from '../models/Category.js';

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
    const category = await Category.findOneAndDelete({
      _id: req.params.id,
      user: req.session.userID,
    });

    if (!category) {
      return res
        .status(403)
        .json({ error: 'Not authorized or word not found' });
    }

    res.status(200).redirect('/words');
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
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
