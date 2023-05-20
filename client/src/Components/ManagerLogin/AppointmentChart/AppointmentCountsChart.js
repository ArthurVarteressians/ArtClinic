import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import Axios from "axios";

const MonthlyClientCountsChart = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get("http://localhost:3001/appointmentCounts");
        const data = response.data;

        const labels = data.map((item) => `${item.departmentName} - ${item.doctorName}`);
        const counts = data.map((item) => item.count);

        const backgroundColors = data.map((_, index) => getBackgroundColor(index));

        setChartData({
          labels,
          datasets: [
            {
              label: "Appointment Counts",
              data: counts,
              backgroundColor: backgroundColors,
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartData && chartRef.current) {
      const chart = new Chart(chartRef.current, {
        type: "pie",
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              max: Math.max(...chartData.datasets[0].data) + 5,
            },
          },
        },
      });

      return () => {
        chart.destroy();
      };
    }
  }, [chartData]);

  const getBackgroundColor = (index) => {
    const colors = [
      "rgba(75, 192, 192, 0.4)",
      "rgba(255, 99, 132, 0.4)",
      "rgba(54, 162, 235, 0.4)",
      "rgba(255, 206, 86, 0.4)",
      "rgba(153, 102, 255, 0.4)",
      // Add more colors as needed
    ];

    return colors[index % colors.length];
  };

  return (
    <div className="ChartSectionss">
      <div style={{ height: "400px", width: "400px" }}>
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};

export default MonthlyClientCountsChart;
