<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>IoT Dashboard</title>

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<style>
    body {
        margin: 0;
        font-family: 'Poppins', sans-serif;
        background: #f5f6fa;
        display: flex;
    }

    /* ===== Sidebar ===== */
    .sidebar {
        width: 250px;
        background: #1e1e2f;
        height: 100vh;
        position: fixed;
        padding: 20px;
        color: white;
    }

    .sidebar h2 {
        margin-top: 0;
        margin-bottom: 30px;
        font-size: 22px;
        text-align: center;
    }

    .sidebar a {
        display: block;
        padding: 12px;
        margin-bottom: 10px;
        border-radius: 8px;
        text-decoration: none;
        color: #ccc;
        transition: 0.3s;
    }
    .sidebar a:hover {
        background: #4c4cff;
        color: white;
    }

    /* ===== Main Content ===== */
    .content {
        margin-left: 250px;
        padding: 25px;
        width: 100%;
    }

    .header {
        font-size: 28px;
        font-weight: 600;
        margin-bottom: 25px;
    }

    /* ===== Cards ===== */
    .cards {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        margin-bottom: 25px;
    }

    .card {
        background: white;
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0px 3px 10px rgba(0,0,0,0.1);
    }

    .card h3 {
        margin: 0;
        font-size: 20px;
        font-weight: 500;
    }

    .card .value {
        font-size: 36px;
        margin-top: 10px;
        font-weight: 600;
        color: #4c4cff;
    }

    /* ===== Table + Chart ===== */
    .grid-2 {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 25px;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        background: white;
        border-radius: 10px;
        overflow: hidden;
    }

    th, td {
        padding: 12px;
        border-bottom: 1px solid #eee;
        text-align: center;
    }

    th {
        background: #f0f0f0;
    }

    tr:hover {
        background: #f9f9f9;
    }

</style>
</head>

<body>

<!-- Sidebar -->
<div class="sidebar">
    <h2>IoT Dashboard</h2>
    <a href="#">📊 Dashboard</a>
    <a href="#">📁 Logs</a>
    <a href="#">⚙ Settings</a>
</div>

<!-- Main Content -->
<div class="content">
    <div class="header">📊 IoT Monitoring Dashboard</div>

    <!-- Summary Cards -->
    <div class="cards">
        <div class="card">
            <h3>Temperature</h3>
            <div class="value" id="tempValue">27°C</div>
        </div>
        <div class="card">
            <h3>Humidity</h3>
            <div class="value" id="humValue">60%</div>
        </div>
        <div class="card">
            <h3>Fan Status</h3>
            <div class="value" id="fanValue">Off</div>
        </div>
    </div>

    <!-- Table + Chart -->
    <div class="grid-2">
        <!-- Table -->
        <table id="dataTable">
            <thead>
                <tr>
                    <th>Datetime</th>
                    <th>Temp (°C)</th>
                    <th>Humidity (%)</th>
                    <th>Fan</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>2025-06-16 12:40</td><td>27</td><td>26</td><td>Off</td></tr>
                <tr><td>2025-06-16 12:35</td><td>27</td><td>26</td><td>Off</td></tr>
                <tr><td>2025-06-16 12:30</td><td>26</td><td>28</td><td>Off</td></tr>
                <tr><td>2025-06-16 12:25</td><td>26</td><td>28</td><td>Off</td></tr>
            </tbody>
        </table>

        <!-- Chart -->
        <canvas id="myChart"></canvas>
    </div>
</div>

<script src="main.js"></script>

</body>
</html>
