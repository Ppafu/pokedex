import Chart from "chart.js/auto";

export const createRadarChart = async function (data, id, label) {
  new Chart(document.getElementById(`${id}-radar`), {
    type: "radar",
    data: {
      labels: Object.keys(data),
      datasets: [
        {
          label: label,
          data: Object.values(data),
          backgroundColor: ["rgba(153, 102, 255, 0.5)"],
        },
      ],
    },
    options: {
      events: [],
      responsive: true,
      aspectRatio: 2,
      plugins: {
        legend: {
          display: false,
        },
      },
      scale: {
        min: 5,
        // max: 250,
        ticks: {
          stepSize: 20,
        },
      },
      scales: {
        r: {
          angleLines: { color: ["#fff"] },
          backgroundColor: ["#dee2e6"],
          ticks: {
            display: false,
          },
          grid: {
            display: false,
          },
          pointLabels: {
            font: {
              family: "Roboto Mono",
              size: 16,
            },
          },
        },
      },
      elements: {
        line: {
          backgroundColor: ["#fff"],
          borderWidth: 0,
        },
        point: {
          radius: 0,
        },
      },
    },
  });
};

export const createBarChart = async function (data, id, label) {
  const labelsWithData = Object.keys(data).map((key) => `${key}: ${data[key]}`);
  new Chart(document.getElementById(`${id}-bar`), {
    type: "bar",
    data: {
      labels: labelsWithData,
      datasets: [
        {
          label: label,
          data: Object.values(data),
          backgroundColor: [
            "rgba(255, 99, 132)",
            "rgba(255, 159, 64)",
            "rgba(255, 205, 86)",
            "rgba(75, 192, 192)",
            "rgba(54, 162, 235)",
            "rgba(245, 120, 255)",
          ],
          barThickness: 12,
          borderRadius: 99,
          borderSkipped: false,
        },
      ],
    },
    options: {
      aspectRatio: 3.2,
      responsive: true,
      indexAxis: "y",
      events: [],
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          display: false,
          // max: 250,
          grid: {
            display: false,
          },
        },
        y: {
          ticks: {
            font: { size: 16, family: "Roboto Mono" },
          },
          grid: {
            display: false,
          },
          border: {
            display: false,
          },
        },
      },
    },
  });
};
