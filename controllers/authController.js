import User from '../models/User.js';
import bcrypt from 'bcrypt';
import Category from '../models/User.js';

export async function createUser(req, res) {
  try {
    const user = await User.create(req.body);
    res.status(201).redirect('/login');
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    // find user from DB
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'User not found' });
    }

    // password control
    const same = await bcrypt.compare(password, user.password);

    if (!same) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'Incorrect Password' });
    }

    // USER SESSION
    req.session.userID = user._id;
    req.session.username = user.name;

    res.status(201).redirect('/');
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    });
  }
}

export async function logoutUser(req, res) {
  req.session.destroy(() => {
    res.redirect('/');
  });
}
