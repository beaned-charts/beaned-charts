'use client';

import { useEffect, useState } from 'react';
import { ReactChartComponents } from 'beaned-charts';

export default function Home() {
  const [charts, setCharts] = useState({ area: '', bar: '', line: '' });

  useEffect(() => {
    // Sample data for Area Chart
    const areaData = [
      { date: "2024-01-01", desktop: 222, mobile: 150 },
      { date: "2024-01-02", desktop: 97, mobile: 180 },
      { date: "2024-01-03", desktop: 167, mobile: 120 },
      { date: "2024-01-04", desktop: 242, mobile: 260 },
      { date: "2024-01-05", desktop: 373, mobile: 290 },
      { date: "2024-01-06", desktop: 301, mobile: 340 },
      { date: "2024-01-07", desktop: 245, mobile: 180 },
      { date: "2024-01-08", desktop: 409, mobile: 320 },
      { date: "2024-01-09", desktop: 59, mobile: 110 },
      { date: "2024-01-10", desktop: 261, mobile: 190 },
    ];

    // Sample data for Bar Chart
    const barData = [
      { label: 'Product A', value: 120 },
      { label: 'Product B', value: 190 },
      { label: 'Product C', value: 300 },
      { label: 'Product D', value: 250 },
      { label: 'Product E', value: 420 }
    ];

    // Sample data for Line Chart
    const lineData = [
      { value: 30 },
      { value: 45 },
      { value: 35 },
      { value: 50 },
      { value: 65 },
      { value: 40 },
      { value: 55 }
    ];

    const areaChart = ReactChartComponents.createAreaChart(areaData, { width: 800, height: 400 });
    const barChart = ReactChartComponents.createBarChart(barData, { width: 600, height: 350 });
    const lineChart = ReactChartComponents.createLineChart(lineData, { width: 600, height: 300, smooth: true, color: '#10b981' });

    setCharts({ area: areaChart, bar: barChart, line: lineChart });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-transparent p-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-700 dark:text-gray-300 opacity-80">Beaned-Charts Demo</h1>
      <div className="space-y-12 w-full max-w-4xl">
        <div className="bg-white/10 dark:bg-gray-900/20 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-white/20">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300 opacity-80">Area Chart</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 opacity-70">Multi-series area chart showing desktop and mobile data over time.</p>
          <div dangerouslySetInnerHTML={{ __html: charts.area }} />
        </div>
        <div className="bg-white/10 dark:bg-gray-900/20 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-white/20">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300 opacity-80">Bar Chart</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 opacity-70">Product comparison bar chart with hover tooltips.</p>
          <div dangerouslySetInnerHTML={{ __html: charts.bar }} />
        </div>
        <div className="bg-white/10 dark:bg-gray-900/20 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-white/20">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300 opacity-80">Line Chart</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 opacity-70">Smooth line chart with enhanced data points.</p>
          <div dangerouslySetInnerHTML={{ __html: charts.line }} />
        </div>
      </div>
    </div>
  );
}
