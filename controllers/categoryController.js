import Category from '../models/Category.js';

export async function createCategory(req, res) {
  const category = await Category.create(req.body);
  try {
    res.status(201).json({
      status: 'success',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      err,
    });
  }
}
