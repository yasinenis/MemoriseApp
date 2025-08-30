import User from '../models/User.js';

export async function createUser(req, res) {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      status: 'success',
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    });
  }
}
