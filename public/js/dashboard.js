import * as myCharts from './charts.js';
const viewWeeklyDOM = document.getElementById('weekly-drop');
const viewMonthlyDOM = document.getElementById('monthly-drop');
const viewYearlyDOM = document.getElementById('yearly-drop');

const weeklyChartDOM = document.getElementById('weeklyChart');
const monthlyChartDOM = document.getElementById('monthlyChart');
const yearlyChartDOM = document.getElementById('yearlyChart');

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
