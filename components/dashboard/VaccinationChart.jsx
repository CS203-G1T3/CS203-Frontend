import React from 'react';
import { Line } from 'react-chartjs-2';

const data = {
  labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
  datasets: [
    {
      label: 'Vaccinated',
      data: [1, 3, 6, 16, 26, 40],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
    {
      label: 'Covid',
      data: [1, 2, 1, 1, 2, 2],
      fill: false,
      backgroundColor: 'rgb(54, 162, 235)',
      borderColor: 'rgba(54, 162, 235, 0.2)',
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        type: 'linear',
        display: true,
        position: 'left',
      }
    ],
  },
};

const VaccinationChart = () => (
  <>
    <Line data={data} options={options} />
  </>
);

export default VaccinationChart;
