// ==============================
// WEATHER API (Bangkok 7-day forecast)
// ==============================
const WEATHER_API =
    "https://api.open-meteo.com/v1/forecast" +
    "?latitude=13.75&longitude=100.50" +
    "&daily=temperature_2m_max,rain_sum,uv_index_max,shortwave_radiation_sum" +
    "&timezone=Asia/Bangkok";

// ==============================
// AIR QUALITY API (PM2.5 forecast)
// ==============================
const AIR_API =
    "https://air-quality-api.open-meteo.com/v1/air-quality" +
    "?latitude=13.75&longitude=100.50" +
    "&hourly=pm2_5" +
    "&timezone=Asia/Bangkok";

let chartInstance = null;

// ==============================
// LOAD FORECAST + INSERT TO TABLE
// ==============================
async function loadWeatherForecast() {
    try {
        // ดึงข้อมูลพร้อมกัน
        const [weatherRes, airRes] = await Promise.all([
            fetch(WEATHER_API),
            fetch(AIR_API)
        ]);

        const weatherData = await weatherRes.json();
        const airData = await airRes.json();

        const dates = weatherData.daily.time;
        const temps = weatherData.daily.temperature_2m_max;
        const rains = weatherData.daily.rain_sum;
        const uv = weatherData.daily.uv_index_max;
        const sunlight = weatherData.daily.shortwave_radiation_sum;

        // ==============================
        // คำนวณ PM2.5 รายวัน (เฉลี่ยจากรายชั่วโมง)
        // ==============================
        const pm25Daily = {};
        airData.hourly.time.forEach((t, i) => {
            const day = t.split("T")[0];
            if (!pm25Daily[day]) pm25Daily[day] = [];
            pm25Daily[day].push(airData.hourly.pm2_5[i]);
        });

        const pm25Avg = dates.map(d => {
            const arr = pm25Daily[d];
            if (!arr) return "-";
            const avg = arr.reduce((a, b) => a + b, 0) / arr.length;
            return avg.toFixed(1);
        });

        const tbody = document
            .getElementById("temperatureTable")
            .getElementsByTagName("tbody")[0];

        tbody.innerHTML = "";

        for (let i = 0; i < dates.length; i++) {
            const row = `
                <tr class="hover:bg-gray-100">
                    <td class="py-2 px-4 border">${dates[i]}</td>
                    <td class="py-2 px-4 border">${temps[i]} °C</td>
                    <td class="py-2 px-4 border">${rains[i]} mm</td>
                    <td class="py-2 px-4 border">${uv[i]}</td>
                    <td class="py-2 px-4 border">${sunlight[i]} MJ/m²</td>
                    <td class="py-2 px-4 border">${pm25Avg[i]}</td>
                </tr>
            `;
            tbody.innerHTML += row;
        }

        drawLineChart(dates, temps);

    } catch (error) {
        console.error("Error loading forecast:", error);
    }
}

// ==============================
// DRAW CHART
// ==============================
function drawLineChart(dates, temps) {
    const ctx = document.getElementById("myChart").getContext("2d");

    if (chartInstance) chartInstance.destroy();

    chartInstance = new Chart(ctx, {
        type: "line",
        data: {
            labels: dates,
            datasets: [{
                label: "Max Temperature (°C)",
                data: temps,
                borderColor: "#ef4444",
                backgroundColor: "rgba(239,68,68,0.2)",
                borderWidth: 2,
                fill: true,
                tension: 0.35,
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    title: { display: true, text: "Temperature (°C)" }
                },
                x: {
                    title: { display: true, text: "Date" }
                }
            }
        }
    });
}

// ==============================
// ON PAGE LOAD
// ==============================
window.onload = function () {
    loadWeatherForecast();
};
