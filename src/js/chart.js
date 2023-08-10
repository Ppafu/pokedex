import Chart from "chart.js/auto";

export const createChart = async function (data, id, label) {
  new Chart(document.getElementById(id), {
    type: "radar",
    data: {
      labels: Object.keys(data),
      datasets: [
        {
          label: label,
          data: Object.values(data),
        },
      ],
    },
    options: {
      scale: {
        min: 10,
        max: 250,
        ticks: {
          stepSize: 50,
        },
      },
    },
  });
};
