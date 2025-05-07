// src/components/EEGChart.js

import React from 'react';
import { Line } from 'react-chartjs-2';

// 1) import ChartJS from chart.js/auto, which already registers the controllers & elements
import ChartJS from 'chart.js/auto';

// 2) import the zoom plugin and register it on ChartJS
import zoomPlugin from 'chartjs-plugin-zoom';
ChartJS.register(zoomPlugin);

export default function EEGChart({ data }) {
  if (!data) return null;

  const chartData = {
    labels: data.map(d => d.Channel),
    datasets: [{
      label: 'Mean EEG Value',
      data: data.map(d => d.Mean),
      fill: false,
      borderColor: '#10375C',
      tension: 0.3,
      pointBackgroundColor: '#fff',
      pointBorderColor: '#10375C',
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      title: { display: true, text: 'Mean EEG Values by Channel' },
      zoom: {
        pan:  { enabled: true, mode: 'x' },
        zoom: { wheel: true, mode: 'x' }
      }
    },
    scales: {
      x: { title: { display: true, text: 'Channel' } },
      y: { title: { display: true, text: 'Mean Value' } }
    }
  };

  return (
    <div className="chart-container">
      <Line data={chartData} options={options} />
    </div>
  );
}
