# 🚀 Beaned-Charts Demo

A Next.js demo application showcasing the latest features of Beaned-Charts v3.3.0.

## ✨ Features Demonstrated

### 📊 Chart Types
- **AreaChart**: Multi-series area charts with gradient fills and smooth curves
- **BarChart**: Customizable bar charts with hover effects and animations
- **LineChart**: Interactive line charts with crosshair and customizable points
- **PieChart**: Donut/pie charts with explode effects and percentage tooltips

### 🎨 Latest Improvements
- **Always-Visible Tooltips**: Tooltips render on top of all elements (z-index fix)
- **Dynamic Positioning**: Tooltips automatically position above/below based on data point location
- **Customizable Formatting**: Configure tooltip content with format functions
- **Advanced Styling**: Professional gradients, animations, and hover effects
- **Container-Free Rendering**: No clipping issues in React applications

## 🚀 Getting Started

First, install the latest Beaned-Charts:

```bash
pnpm add beaned-charts@latest
# or
npm install beaned-charts@latest
# or
yarn add beaned-charts@latest
```

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see the interactive chart demo.

## 📱 Demo Features

- **Responsive Design**: Charts adapt to different screen sizes
- **Interactive Hover**: Hover over data points to see detailed tooltips
- **Smooth Animations**: Professional transitions and effects
- **Modern UI**: Clean, modern design with proper spacing

## 🎯 Chart Configuration

The demo showcases various configuration options:

```javascript
const chartOptions = {
  width: 600,
  height: 400,
  theme: 'dark',
  colors: ['#ff6b6b', '#4ecdc4', '#45b7d1'],
  tooltipValueFormat: (val) => `$${val.toFixed(2)}`,
  hoverEffects: true,
  showTooltips: true
};
```

## 📦 Dependencies

- `beaned-charts`: Latest chart library with SVG rendering
- `next`: React framework for the demo
- `react`: UI library

## 🚀 Deploy on Vercel

Deploy this demo instantly using Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ez0000001000000/beaned-charts)

## 📚 Learn More

- [Beaned-Charts Documentation](https://github.com/ez0000001000000/beaned-charts)
- [Next.js Documentation](https://nextjs.org/docs)

---

**Beaned-Charts** - Simple. Beautiful. Charts. ✨
