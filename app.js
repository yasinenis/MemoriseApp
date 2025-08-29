import express from 'express';

import pageRoute from './routes/pageRoute.js';
import userRoute from './routes/userRoute.js';

const app = express();

// Teamplate engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.static('public'));

// Routes
app.use('/', pageRoute);
app.use('/users', userRoute);

const port = 3000;

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
