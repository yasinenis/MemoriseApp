import express from 'express';

import * as dashboardController from '../controllers/dashboardController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').get(authMiddleware, dashboardController.getDashboardPage); // localhost:3000/learn
router.route('/fetch-chart-weekly').get(dashboardController.getWeeklyChartInfo);
router.route('/fetch-chart-monthly').get(dashboardController.getMonthChartInfo);

export default router;
