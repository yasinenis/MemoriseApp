import express from 'express';

import mongoose from 'mongoose';

import session from 'express-session';

import MongoStore from 'connect-mongo';

import methodOverride from 'method-override';

import dotenv from 'dotenv';

dotenv.config();

import pageRoute from './routes/pageRoute.js';
import wordRoute from './routes/wordRoute.js';
import userRoute from './routes/userRoute.js';
import learnRoute from './routes/learnRoute.js';
import dashboardRoute from './routes/dashboardRoute.js';
import writeRoute from './routes/writeRoute.js';
import contactRoute from './routes/contactRoute.js';

const app = express();

// Connect DB
mongoose
  .connect(process.env.DATABASE_URL)
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
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: 'false',
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.DATABASE_URL,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);
app.use((req, res, next) => {
  res.locals.userIN = req.session.userID;
  res.locals.username = req.session.username;
  res.locals.email = req.session.email;
  next();
});

// Routes
app.use('/', pageRoute);
app.use('/words', wordRoute);
app.use('/users', userRoute);
app.use('/learn', learnRoute);
app.use('/dashboard', dashboardRoute);
app.use('/write', writeRoute);
app.use('/contact', contactRoute);

const port = 3000;

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
