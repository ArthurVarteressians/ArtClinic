import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import Axios from "axios";
import "./MangerLogin.css";
const MonthlyClientCountsChart = () => {
  const chartRef = useRef(null);
  const [clientCounts, setClientCounts] = useState([]);
  const [showChart, setShowChart] = useState(false);

  const handleGetChart = () => {
    Axios.get("http://localhost:3001/GetNewClientsListssss")
      .then((response) => {
        setClientCounts(response.data);
        setShowChart(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (showChart && chartRef.current) {
      const chart = new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels: Array.from({ length: clientCounts.length }, (_, i) => i + 1),
          datasets: [
            {
              label: "Monthly Client Counts",
              data: clientCounts,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              type: "linear",
              beginAtZero: true,
              max: Math.max(...clientCounts) + 10,
            },
          },
        },
      });

      return () => {
        chart.destroy();
      };
    }
  }, [clientCounts, showChart]);

  return (
    <div className="ChartSectionss">
      <div className="chartBtn">
        {!showChart && <button onClick={handleGetChart}>Get Chart</button>}
        {showChart && <button onClick={handleGetChart}>Get Chart</button>}
      </div>
      <div style={{ height: "400px" }}>
        <canvas ref={chartRef} />
      </div>
      <div>
        <p>
          Total New Clients:{" "}
          {clientCounts.reduce((acc, curr) => acc + curr, 0)}
        </p>
        <p>Max Registered Clients in a Day: {Math.max(...clientCounts)}</p>
      </div>
    </div>
  );
};

export default MonthlyClientCountsChart;
