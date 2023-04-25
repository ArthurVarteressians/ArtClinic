import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import Axios from "axios";
const MonthlyClientCountsChart = () => {
  const chartRef = useRef(null);
  const [clientCounts, setClientCounts] = useState([]);
  const [showChart, setShowChart] = useState(false); // Added showChart state

  const handleGetChart = () => {
    // Fetch monthly client counts from backend
    Axios.get("http://localhost:3001/GetNewClientsListssss")
      .then((response) => {
        setClientCounts(response.data);
        setShowChart(true); // Update showChart state to true after fetching data
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    // Create and update chart
    if (showChart && chartRef.current) { // Render chart only when showChart is true
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

      // Return function to destroy chart on unmount (optional)
      return () => {
        chart.destroy();
      };
    }
  }, [clientCounts, showChart]); // Update chart based on showChart state

  return (
    <div>
      {!showChart && ( // Render button only when showChart is false
        <button onClick={handleGetChart}>Get Chart</button>
      )}
      {showChart && ( // Render chart and information only when showChart is true
        <div>
                  <button onClick={handleGetChart}>Get Chart</button>

          {/* Render chart */}
          <div style={{ height: "400px" }}>
            <canvas ref={chartRef} />
          </div>
          {/* Render information */}
          <div>
            {/* Render information about the chart data */}
            <p>Total Clients: {clientCounts.reduce((acc, curr) => acc + curr, 0)}</p>
            <p>Max Clients in a Day: {Math.max(...clientCounts)}</p>
            {/* Render other information or statistics as needed */}
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthlyClientCountsChart;
