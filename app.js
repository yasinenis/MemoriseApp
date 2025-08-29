import express from 'express';

import mongoose from 'mongoose';

import pageRoute from './routes/pageRoute.js';
import wordRoute from './routes/wordRoute.js';

const app = express();

// Connect DB
mongoose
  .connect('mongodb://localhost:27017/memoris-db')
  .then(() => {
    console.log('Database connected!');
  })
  .catch((err) => {
    console.log(err);
  });

// Teamplate engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', pageRoute);
app.use('/words', wordRoute);

const port = 3000;

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
