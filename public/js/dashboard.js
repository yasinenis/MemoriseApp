import * as myCharts from './charts.js';
const viewWeeklyDOM = document.getElementById('weekly-drop');
const viewMonthlyDOM = document.getElementById('monthly-drop');
const viewYearlyDOM = document.getElementById('yearly-drop');

const weeklyChartDOM = document.getElementById('weeklyChart');
const monthlyChartDOM = document.getElementById('monthlyChart');
const yearlyChartDOM = document.getElementById('yearlyChart');

fetchHeadStatistics();

myCharts.weeklyChart();

viewWeeklyDOM.addEventListener('click', weeklyHandler);

function weeklyHandler() {
  weeklyChartDOM.classList.remove('d-none');
  yearlyChartDOM.classList.add('d-none');
  monthlyChartDOM.classList.add('d-none');
  myCharts.weeklyChart();
}

viewMonthlyDOM.addEventListener('click', monthlyHandler);

function monthlyHandler() {
  weeklyChartDOM.classList.add('d-none');
  yearlyChartDOM.classList.add('d-none');
  monthlyChartDOM.classList.remove('d-none');
  myCharts.monthlyChart();
}

viewYearlyDOM.addEventListener('click', yearlyHandler);

function yearlyHandler() {
  weeklyChartDOM.classList.add('d-none');
  yearlyChartDOM.classList.remove('d-none');
  monthlyChartDOM.classList.add('d-none');
  myCharts.yearlyChart();
}

/* head statistics */
async function fetchHeadStatistics() {
  try {
    const res = await fetch('/dashboard/headStatistics');
    if (res.ok) {
      const data = await res.json();
      const totalWordsCount = data.totalWordsCount;
      const masteredWordsCount = data.masteredWordsCount;
      const writtenWordsCount = data.writtenWordsCount;
      document.querySelector('.totalWords').textContent = totalWordsCount;
      document.querySelector('.masteredWords').textContent = masteredWordsCount;
      document.querySelector('.writtenWords').textContent = writtenWordsCount;
    } else {
      console.log('could not fetch head statistics', res.status);
    }

    const wordRes = await fetch('/learn/fetch-words');
    if (wordRes.ok) {
      const data = await wordRes.json();
      const wordsNeedLearnCount = data.length;
      document.querySelector('.wordsNeedLearn').textContent =
        wordsNeedLearnCount;
    } else {
      console.log('coult not fetch words', wordRes.status);
    }
  } catch (err) {
    console.error('Fetch error:', err);
  }
}
