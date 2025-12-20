const DUST_API =
  "http://peopleiot.atwebpages.com/AerosenseDustPMLog.php";
const TEMP_API =
  "http://peopleiot.atwebpages.com/AerosenseTempLog.php";

let chartInstance = null;

async function loadWeatherData() {
  try {
    const [dustRes, tempRes] = await Promise.all([
      fetch(DUST_API),
      fetch(TEMP_API)
    ]);

    const dustData = await dustRes.json();
    const tempData = await tempRes.json();

    // map เวลา → temp + humidity
    const tempMap = {};
    tempData.forEach(item => {
      tempMap[item.DateTime] = item;
    });

    const tbody = document
      .getElementById("temperatureTable")
      .getElementsByTagName("tbody")[0];

    tbody.innerHTML = "";

    const labels = [];
    const tempValues = [];
    const dustValues = [];
    const lightValues = [];

    dustData.forEach(item => {
      const tempItem = tempMap[item.DateTime];

      const temperature = tempItem ? Number(tempItem.Temperature) : null;
      const humidity = tempItem ? Number(tempItem.Humidity) : null;

      labels.push(item.DateTime);
      tempValues.push(temperature);
      dustValues.push(Number(item.DustPM));
      lightValues.push(Number(item.LDR));

      const row = `
        <tr class="hover:bg-gray-100">
          <td class="py-2 px-4 border">${item.DateTime}</td>
          <td class="py-2 px-4 border">${temperature ?? "-"}</td>
          <td class="py-2 px-4 border">${humidity ?? "-"}</td>
          <td class="py-2 px-4 border">${item.DustPM}</td>
          <td class="py-2 px-4 border">${item.LDR}</td>
        </tr>
      `;
      tbody.innerHTML += row;
    });

    drawChart(labels, tempValues, dustValues, lightValues);

  } catch (error) {
    console.error("Error loading data:", error);
  }
}

// ==============================
// CHART (Temp + Dust + Light)
// ==============================
function drawChart(labels, temps, dusts, lights) {
  const ctx = document.getElementById("myChart").getContext("2d");

  if (chartInstance) chartInstance.destroy();

  chartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Temperature (°C)",
          data: temps,
          borderWidth: 2,
          tension: 0.3
        },
        {
          label: "Dust PM",
          data: dusts,
          borderWidth: 2,
          tension: 0.3
        },
        {
          label: "Light (LDR)",
          data: lights,
          borderWidth: 2,
          tension: 0.3
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

window.onload = loadWeatherData;
