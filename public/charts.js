// Utils örnek fonksiyonları (basit sayı üretimi ve renkler)

let yearlyChartInstance = null;
let weeklyChartInstance = null;
let monthlyChartInstance = null;

export function yearlyChart() {
  const canvas = document.getElementById('yearlyChart');

  // Eğer chart varsa önce destroy et
  if (yearlyChartInstance) {
    yearlyChartInstance.destroy();
  }

  const Utils = {
    months({ count }) {
      const allMonths = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      return allMonths.slice(0, count);
    },
    numbers({ count, min, max }) {
      return Array.from(
        { length: count },
        () => Math.floor(Math.random() * (max - min + 1)) + min
      );
    },
    CHART_COLORS: {
      red: 'rgba(255, 99, 132, 0.5)',
      blue: 'rgba(54, 162, 235, 0.5)',
      green: 'rgba(75, 192, 192, 0.5)',
      orange: 'rgb(255, 159, 64)',
      newWords: 'rgb(54, 162, 235,0.7)', // mavi
      learning: 'rgb(255, 205, 86,0.7)', // sarı
      learned: 'rgb(75, 192, 192,0.7)', // yeşil
      writed: 'rgb(153, 102, 255,0.7)', // mor
    },
  };

  // Data
  const DATA_COUNT = 12;
  const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 };
  const labels = Utils.months({ count: DATA_COUNT });
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'New',
        data: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
        backgroundColor: Utils.CHART_COLORS.newWords,
      },
      {
        label: 'learning',
        data: [10, 10, 10, 10, 20, 10, 10, 10, 10, 10, 10, 10],
        backgroundColor: Utils.CHART_COLORS.learning,
      },
      {
        label: 'writed',
        data: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
        backgroundColor: Utils.CHART_COLORS.writed,
      },
      {
        label: 'learned',
        data: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 50],
        backgroundColor: Utils.CHART_COLORS.learned,
      },
    ],
  };
  // Config
  const config = {
    type: 'bar',
    data: data,
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Yearly Statistics',
        },
      },
      responsive: true,
      scales: {
        x: { stacked: true },
        y: { stacked: true },
      },
    },
  };

  // Chart oluşturma
  yearlyChartInstance = new Chart(
    document.getElementById('yearlyChart'),
    config
  );
  return yearlyChartInstance;
}

export function weeklyChart() {
  const canvas = document.getElementById('weeklyChart');

  // Eğer chart varsa önce destroy et
  if (weeklyChartInstance) {
    weeklyChartInstance.destroy();
  }

  const Utils = {
    months({ count }) {
      const allMonths = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      return allMonths.slice(0, count);
    },
    numbers({ count, min, max }) {
      return Array.from(
        { length: count },
        () => Math.floor(Math.random() * (max - min + 1)) + min
      );
    },
    CHART_COLORS: {
      red: 'rgba(255, 99, 132, 0.5)',
      blue: 'rgba(54, 162, 235, 0.5)',
      green: 'rgba(75, 192, 192, 0.5)',
      orange: 'rgb(255, 159, 64)',
      newWords: 'rgb(54, 162, 235,0.7)', // mavi
      learning: 'rgb(255, 205, 86,0.7)', // sarı
      learned: 'rgb(75, 192, 192,0.7)', // yeşil
      writed: 'rgb(153, 102, 255,0.7)', // mor
    },
  };

  // Data
  const DATA_COUNT = 7;
  const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 };
  const labels = Utils.months({ count: DATA_COUNT });
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'New',
        data: [1, 4, 5, 15, 5, 5, 30],
        backgroundColor: Utils.CHART_COLORS.newWords,
      },
      {
        label: 'learning',
        data: [5, 5, 5, 5, 5, 5, 5],
        backgroundColor: Utils.CHART_COLORS.learning,
      },
      {
        label: 'writed',
        data: [5, 5, 5, 5, 5, 5, 5],
        backgroundColor: Utils.CHART_COLORS.writed,
      },
      {
        label: 'learned',
        data: [5, 5, 5, 5, 5, 5, 10],
        backgroundColor: Utils.CHART_COLORS.learned,
      },
    ],
  };
  // Config
  const config = {
    type: 'bar',
    data: data,
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Weekly Statistics',
        },
      },
      responsive: true,
      scales: {
        x: { stacked: true },
        y: { stacked: true },
      },
    },
  };

  // Chart oluşturma
  weeklyChartInstance = new Chart(
    document.getElementById('weeklyChart'),
    config
  );
  return weeklyChartInstance;
}

export function monthlyChart() {
  const canvas = document.getElementById('monthlyChart');

  // If there is a chart, destroy it before
  if (monthlyChartInstance) {
    monthlyChartInstance.destroy();
  }

  const Utils = {
    months({ count }) {
      const allMonths = [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
        '22',
        '23',
        '24',
        '25',
        '26',
        '27',
        '28',
        '29',
        '30',
      ];
      return allMonths.slice(0, count);
    },
    numbers({ count, min, max }) {
      return Array.from(
        { length: count },
        () => Math.floor(Math.random() * (max - min + 1)) + min
      );
    },
    CHART_COLORS: {
      red: 'rgba(255, 99, 132, 0.5)',
      blue: 'rgba(54, 162, 235, 0.5)',
      green: 'rgba(75, 192, 192, 0.5)',
      orange: 'rgb(255, 159, 64)',
      newWords: 'rgb(54, 162, 235,0.7)', // mavi
      learning: 'rgb(255, 205, 86,0.7)', // sarı
      learned: 'rgb(75, 192, 192,0.7)', // yeşil
      writed: 'rgb(153, 102, 255,0.7)', // mor
    },
  };

  // Data
  const DATA_COUNT = 30;
  const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 };
  const labels = Utils.months({ count: DATA_COUNT });
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'New',
        data: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
        backgroundColor: Utils.CHART_COLORS.newWords,
      },
      {
        label: 'learning',
        data: [10, 10, 10, 10, 20, 10, 10, 10, 10, 10, 10, 10],
        backgroundColor: Utils.CHART_COLORS.learning,
      },
      {
        label: 'writed',
        data: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
        backgroundColor: Utils.CHART_COLORS.writed,
      },
      {
        label: 'learned',
        data: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 50],
        backgroundColor: Utils.CHART_COLORS.learned,
      },
    ],
  };
  // Config
  const config = {
    type: 'bar',
    data: data,
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Monthly Statistics',
        },
      },
      responsive: true,
      scales: {
        x: { stacked: true },
        y: { stacked: true },
      },
    },
  };

  // Chart oluşturma
  monthlyChartInstance = new Chart(
    document.getElementById('monthlyChart'),
    config
  );
  return monthlyChartInstance;
}
/*

// Randomize butonunu eklemek istersen
const actions = [
  {
    name: 'Randomize',
    handler(chart) {
      chart.data.datasets.forEach((dataset) => {
        dataset.data = Utils.numbers({
          count: chart.data.labels.length,
          min: -100,
          max: 100,
        });
      });
      chart.update();
    },
  },
];

// Örnek: 2 saniye sonra randomize et
// setTimeout(() => actions[0].handler(myChart), 2000);
*/
