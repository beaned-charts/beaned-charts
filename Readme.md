
# 🚀 Beaned-Charts

[![npm version](https://badge.fury.io/js/beaned-charts.svg)](https://badge.fury.io/js/beaned-charts)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Beautiful SVG chart library with advanced color palettes, modern styling, and always-visible tooltips.** Create stunning, responsive charts with pure JavaScript!

## ✨ Latest Updates (2.3.0)
- **Always-Visible Tooltips**: Tooltips now render on top of all chart elements (z-index fix) - never get cut off!
- **Customizable Tooltips**: Configure tooltip content with `tooltipValueFormat`, `tooltipLabelFormat`, `tooltipTitleFormat`, and custom content
- **PieChart in Demo**: Added interactive pie charts to the React demo with hover effects
- **Container Clipping Fix**: Removed clipping containers in demo for proper tooltip visibility

## 🚀 Quick Start

```javascript
const { BarChart, LineChart, PieChart } = require('beaned-charts');

const chart = new BarChart(data, {
  width: 600,
  height: 400,
  theme: 'dark',
  colors: ['#ff6b6b', '#4ecdc4', '#45b7d1'],
  tooltipValueFormat: (val) => `$${val.toFixed(2)}`,
  hoverEffects: true
});

document.body.innerHTML += chart.render();
```

## 📊 Chart Types

### BarChart
Fully customizable bar charts with gradients, animations, and interactive tooltips.

```javascript
const barChart = new BarChart(data, {
  theme: 'dark',
  barSpacing: 0.3,
  barBorderRadius: 4,
  showGrid: true,
  hoverEffects: true,
  tooltipValueFormat: (val) => `$${val.toLocaleString()}`
});
```

### LineChart
Smooth, interactive line charts with crosshair and customizable points.

```javascript
const lineChart = new LineChart(data, {
  theme: 'dark',
  smooth: true,
  showPoints: true,
  showCrosshair: true,
  strokeWidth: 3,
  tooltipValueFormat: (val) => val.toFixed(1)
});
```

### PieChart
Interactive pie/donut charts with hover effects and percentage tooltips.

```javascript
const pieChart = new PieChart(data, {
  holeSize: 0.3, // Donut style
  explodeSlices: true,
  showCenterLabel: true,
  centerLabelText: 'Total Sales',
  tooltipPercentageFormat: (pct) => `${pct}%`
});
```

## 🎨 Key Features

- **Themes**: Light & dark themes with auto-styling
- **Colors**: Advanced color palettes with chroma-js gradients
- **Animations**: Smooth hover effects and transitions
- **Responsive**: Pure SVG with customizable dimensions
- **Tooltips**: Always-visible, fully customizable tooltips
- **Typography**: Custom fonts and text formatting
- **Data Formatting**: Flexible label and value formatters

## 📦 Installation

```bash
npm install beaned-charts
```

## 🤝 Contributing

Contributions welcome! Submit pull requests with improvements.

---

**Beaned-Charts** - Simple. Beautiful. Charts. 🚀
