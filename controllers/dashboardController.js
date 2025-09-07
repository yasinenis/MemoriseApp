import Word from '../models/Word.js';

export async function getDashboardPage(req, res) {
  try {
    res.status(200).render('dashboard');
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    });
  }
}

async function calculateOneMonth(req, monthOffset = 0) {
  const today = new Date();
  const userId = req.session.userID;

  const year = today.getFullYear();
  const month = today.getMonth() + monthOffset;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dailyDataOfMonth = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const start = new Date(year, month, day, 0, 0, 0, 0);
    const end = new Date(year, month, day, 23, 59, 59, 999);

    const targetNew = await Word.countDocuments({
      user: userId,
      createdAt: { $gte: start, $lte: end },
    });

    const targetRemembered = await Word.countDocuments({
      user: userId,
      rememberHistory: { $gte: start, $lte: end },
    });

    const targetMastered = await Word.countDocuments({
      user: userId,
      masteredHistory: { $gte: start, $lte: end },
    });

    dailyDataOfMonth.push({ targetNew, targetRemembered, targetMastered });
  }

  return dailyDataOfMonth;
}

export async function getMonthChartInfo(req, res) {
  try {
    const dailyDataOfMonth = await calculateOneMonth(req);
    console.log(dailyDataOfMonth);
    res.status(200).json(dailyDataOfMonth);
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    });
  }
}

async function calculateWeekly(req, targetDay) {
  const today = new Date();
  let dayOfWeek = today.getDay(); // 0 = Pazar, 1 = Pazartesi, ..., 6 = Cumartesi
  dayOfWeek = (dayOfWeek + 6) % 7; // 0 = Pazartesi, 6= Pazar

  const targetDateStart = new Date(today);

  targetDateStart.setDate(today.getDate() + (targetDay - dayOfWeek));
  targetDateStart.setHours(0, 0, 0, 0);

  const targetDateEnd = new Date(targetDateStart);
  targetDateEnd.setHours(23, 59, 59, 999);

  const userId = req.session.userID;

  const targetNew = await Word.countDocuments({
    user: userId,
    createdAt: { $gte: targetDateStart, $lte: targetDateEnd },
  });

  const targetRemembered = await Word.countDocuments({
    user: userId,
    rememberHistory: { $gte: targetDateStart, $lte: targetDateEnd },
  });

  const targetMastered = await Word.countDocuments({
    user: userId,
    masteredHistory: { $gte: targetDateStart, $lte: targetDateEnd },
  });
  return { targetNew, targetRemembered, targetMastered };
}

export async function getWeeklyChartInfo(req, res) {
  try {
    const monday = await calculateWeekly(req, 0);
    const tuesday = await calculateWeekly(req, 1);
    const wednesday = await calculateWeekly(req, 2);
    const thursday = await calculateWeekly(req, 3);
    const friday = await calculateWeekly(req, 4);
    const saturday = await calculateWeekly(req, 5);
    const sunday = await calculateWeekly(req, 6);

    const weeklyNew = [
      monday.targetNew,
      tuesday.targetNew,
      wednesday.targetNew,
      thursday.targetNew,
      friday.targetNew,
      saturday.targetNew,
      sunday.targetNew,
    ];

    const weeklyRemembered = [
      monday.targetRemembered,
      tuesday.targetRemembered,
      wednesday.targetRemembered,
      thursday.targetRemembered,
      friday.targetRemembered,
      saturday.targetRemembered,
      sunday.targetRemembered,
    ];

    const weeklyMastered = [
      monday.targetMastered,
      tuesday.targetMastered,
      wednesday.targetMastered,
      thursday.targetMastered,
      friday.targetMastered,
      saturday.targetMastered,
      sunday.targetMastered,
    ];

    res.status(200).json({ weeklyNew, weeklyRemembered, weeklyMastered });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    });
  }
}
