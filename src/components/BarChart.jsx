import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const BarChart = ({ data }) => {
  const maxPercentage = Math.max(
    ...data.map((item) => parseFloat(item.percentage))
  );
  const adjustedMax = Math.ceil(maxPercentage / 5) * 5;

  const chartData = {
    labels: data.map((item) => item.hour),
    datasets: [
      {
        label: 'Cantidad de Empleados',
        data: data.map((item) => item.percentage),
        backgroundColor: '#50B9FF',
        borderRadius: 5,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
        formatter: (value, context) => {
          const percentage = data[context.dataIndex].percentage;
          return `${percentage}%`;
        },
        font: {
          size: 14,
          weight: 'bold',
        },
        color: '#868686',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const { dataIndex } = tooltipItem;
            const employeesCount = data[dataIndex].employeesCount;
  
            return `${employeesCount} empleados`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: adjustedMax,
        ticks: {
          callback: (value) => `${value}%`,
          font: {
            size: 14,
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-[500px]">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
