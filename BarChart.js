// Beaned-Charts BarChart
// Professional bar chart with customizable dimensions and styling

const { SVGFactory, normalizeCoordinate, getColor, createGradient, createAreaGradient, adjustColorBrightness } = require('./utils');

class BarChart {
  constructor(data, options = {}) {
    // Core data and dimensions
    this.data = data;
    this.width = options.width || 400;
    this.height = options.height || 300;
    this.padding = options.padding || 40;

    // Colors and themes
    this.colors = options.colors || [];
    this.colorPalette = options.colorPalette || 'default'; // New: color palette option
    this.theme = options.theme || 'light';
    this.backgroundColor = options.backgroundColor || (this.theme === 'dark' ? '#1a1a1a' : '#ffffff');
    this.gridColor = options.gridColor || (this.theme === 'dark' ? '#333333' : '#e5e5e5');
    this.axisColor = options.axisColor || (this.theme === 'dark' ? '#cccccc' : '#666666');
    this.textColor = options.textColor || (this.theme === 'dark' ? '#ffffff' : '#333333');
    this.barColor = options.barColor; // Override default colors
    this.barHoverColor = options.barHoverColor; // Hover color for bars
    this.tooltipBackgroundColor = options.tooltipBackgroundColor || (this.theme === 'dark' ? '#2a2a2a' : '#ffffff');
    this.tooltipTextColor = options.tooltipTextColor || (this.theme === 'dark' ? '#ffffff' : '#333333');
    this.tooltipBorderColor = options.tooltipBorderColor || (this.theme === 'dark' ? '#555555' : '#e1e5e9');

    // Fonts and text
    this.fontFamily = options.fontFamily || '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif';
    this.fontSize = options.fontSize || 12;
    this.axisLabelFontSize = options.axisLabelFontSize || 10;
    this.tooltipFontSize = options.tooltipFontSize || 11;
    this.xAxisLabelFormat = options.xAxisLabelFormat; // Custom X-axis label formatting
    this.yAxisLabelFormat = options.yAxisLabelFormat; // Custom Y-axis label formatting
    this.tooltipValueFormat = options.tooltipValueFormat; // Custom tooltip value formatting
    this.tooltipLabelFormat = options.tooltipLabelFormat; // Custom tooltip label formatting

    // Chart display options
    this.showBackground = options.showBackground !== false;
    this.showGrid = options.showGrid !== false;
    this.showLabels = options.showLabels !== false;
    this.showTooltips = options.showTooltips !== false;
    this.showXAxis = options.showXAxis !== false;
    this.showYAxis = options.showYAxis !== false;
    this.hoverEffects = options.hoverEffects !== false;

    // Bar customization
    this.barWidth = options.barWidth; // Custom width for all bars, or array of widths
    this.barHeight = options.barHeight; // Custom height for all bars, or array of heights
    this.minBarWidth = options.minBarWidth || 20;
    this.maxBarWidth = options.maxBarWidth;
    this.minBarHeight = options.minBarHeight || 10;
    this.maxBarHeight = options.maxBarHeight;
    this.barSpacing = options.barSpacing || 0.2; // Spacing between bars (0-1)
    this.barBorderRadius = options.barBorderRadius || 3; // Border radius for bars
    this.barOpacity = options.barOpacity || 0.9; // Opacity for bars
    this.barHoverOpacity = options.barHoverOpacity || 0.8; // Hover opacity

    // Grid and axis customization
    this.gridLines = options.gridLines || 5; // Number of grid lines
    this.gridDashArray = options.gridDashArray || '4,4'; // Dash pattern for grid lines
    this.gridOpacity = options.gridOpacity || 0.5; // Grid line opacity
    this.axisLineWidth = options.axisLineWidth || 1; // Axis line width

    // Animation and interaction
    this.animationDuration = options.animationDuration || 300; // Animation duration in ms
    this.animationEasing = options.animationEasing || 'cubic-bezier(0.4, 0, 0.2, 1)'; // Animation easing

    // Data range customization
    this.minValue = options.minValue; // Minimum value to display
    this.maxValue = options.maxValue; // Maximum value to display
    this.valuePadding = options.valuePadding || 0.1; // Padding around data range (0-1)
  }

  render() {
    // Array to collect tooltips for rendering at the end (to ensure they appear on top)
    const tooltipsToRender = [];

    // Calculate data range with custom options
    const dataValues = this.data.map(d => d.value);
    const dataMin = Math.min(...dataValues);
    const dataMax = Math.max(...dataValues);
    const rangeMin = this.minValue !== undefined ? this.minValue : dataMin - (dataMax - dataMin) * this.valuePadding;
    const rangeMax = this.maxValue !== undefined ? this.maxValue : dataMax + (dataMax - dataMin) * this.valuePadding;
    const maxY = rangeMax;
    const minY = rangeMin;
    
    const chartWidth = this.width - 2 * this.padding;
    const chartHeight = this.height - 2 * this.padding;

    // Calculate or use custom bar dimensions
    let barWidths = [];
    let barHeights = [];

    if (Array.isArray(this.barWidth)) {
      // Individual widths for each bar
      barWidths = this.barWidth.map(w => Math.max(this.minBarWidth || 0, Math.min(this.maxBarWidth || w, w)));
    } else if (this.barWidth) {
      // Same width for all bars
      barWidths = new Array(this.data.length).fill(Math.max(this.minBarWidth || 0, Math.min(this.maxBarWidth || this.barWidth, this.barWidth)));
    } else {
      // Auto-calculate widths
      const defaultBarWidth = (chartWidth / this.data.length) * (1 - this.barSpacing);
      barWidths = new Array(this.data.length).fill(Math.max(this.minBarWidth || 0, defaultBarWidth));
    }

    if (Array.isArray(this.barHeight)) {
      // Individual heights for each bar
      barHeights = this.barHeight.map(h => Math.max(this.minBarHeight || 0, Math.min(this.maxBarHeight || h, h)));
    } else if (this.barHeight) {
      // Same height for all bars
      barHeights = new Array(this.data.length).fill(Math.max(this.minBarHeight || 0, Math.min(this.maxBarHeight || this.barHeight, this.barHeight)));
    } else {
      // Auto-calculate heights based on data
      barHeights = this.data.map(item => normalizeCoordinate(item.value, minY, maxY, this.minBarHeight || 0, Math.max(this.maxBarHeight || chartHeight, this.minBarHeight || 10)));
    }

    // Calculate spacing based on bar widths
    const totalBarWidth = barWidths.reduce((sum, w) => sum + w, 0);
    const totalSpacing = chartWidth - totalBarWidth;
    const spacing = totalSpacing / (this.data.length + 1);

    let svg = SVGFactory.createSVG(this.width, this.height);

    // Fully customizable styling
    svg += `<style>
      .bar-chart {
        font-family: ${this.fontFamily};
        font-size: ${this.fontSize}px;
        color: ${this.textColor};
      }

      .grid-line {
        stroke: ${this.gridColor};
        stroke-width: ${this.axisLineWidth};
        stroke-dasharray: ${this.gridDashArray};
        opacity: ${this.gridOpacity};
      }

      .axis-line {
        stroke: ${this.axisColor};
        stroke-width: ${this.axisLineWidth};
      }

      .bar {
        transition: all ${this.animationDuration}ms ${this.animationEasing};
        cursor: ${this.hoverEffects ? 'pointer' : 'default'};
        rx: ${this.barBorderRadius};
        fill-opacity: ${this.barOpacity};
      }

      .bar:hover {
        ${this.hoverEffects ? `
        fill-opacity: ${this.barHoverOpacity};
        filter: saturate(1.2) brightness(1.1);` : ''}
      }

      .bar-group:hover .bar {
        ${this.hoverEffects ? 'fill-opacity: 0.9;' : ''}
      }

      .value-label {
        opacity: 0;
        transition: all ${this.animationDuration}ms ${this.animationEasing};
        font-weight: 600;
        font-size: ${this.tooltipFontSize}px;
        fill: ${this.textColor};
        dominant-baseline: middle;
      }

      .bar-group:hover .value-label {
        ${this.hoverEffects ? 'opacity: 1; transform: translateY(-8px);' : ''}
      }

      .tooltip {
        opacity: 0;
        transition: opacity ${this.animationDuration}ms ${this.animationEasing};
        pointer-events: none;
      }

      .tooltip-rect {
        fill: ${this.tooltipBackgroundColor};
        rx: 10px;
        stroke: ${this.tooltipBorderColor};
        stroke-width: 1;
        filter: drop-shadow(0 4px 12px rgba(0,0,0,0.1));
      }

      .tooltip-title {
        fill: ${this.tooltipTextColor};
        font-size: ${this.tooltipFontSize + 1}px;
        font-weight: 600;
      }

      .tooltip-label {
        fill: #6b7280;
        font-size: ${this.tooltipFontSize}px;
      }

      .tooltip-value {
        fill: ${this.tooltipTextColor};
        font-size: ${this.tooltipFontSize}px;
        font-weight: 600;
        text-anchor: end;
      }

      .tooltip-marker {
        rx: 3px;
      }

      .bar-group:hover .tooltip {
        ${this.showTooltips ? 'opacity: 1;' : ''}
      }

      .x-axis-label {
        font-size: ${this.axisLabelFontSize}px;
        fill: ${this.axisColor};
        text-anchor: middle;
        font-weight: 500;
      }

      .y-axis-label {
        font-size: ${this.axisLabelFontSize}px;
        fill: ${this.axisColor};
        text-anchor: end;
        dominant-baseline: middle;
      }
    </style>`;

    // Background (conditional and customizable)
    if (this.showBackground) {
      svg += `<rect width="${this.width}" height="${this.height}" fill="${this.backgroundColor}" rx="12" />`;
    }

    svg += SVGFactory.createGroup();

    // Add grid lines and Y-axis labels (conditional)
    if (this.showGrid || this.showYAxis) {
      const gridSpacing = chartHeight / this.gridLines;
      const valueRange = maxY - minY;
      const valueSpacing = valueRange / this.gridLines;

      // Horizontal grid lines and Y-axis labels
      for (let i = 0; i <= this.gridLines; i++) {
        const y = this.height - this.padding - (i * gridSpacing);
        const value = minY + (i * valueSpacing);

        // Grid line (conditional)
        if (this.showGrid) {
          svg += `<line class="grid-line" x1="${this.padding}" y1="${y}" x2="${this.width - this.padding}" y2="${y}" />`;
        }

        // Y-axis label (conditional)
        if (this.showYAxis && i > 0) {
          const labelText = this.yAxisLabelFormat ? this.yAxisLabelFormat(Math.round(value)) : Math.round(value);
          svg += `<text class="y-axis-label" x="${this.padding - 8}" y="${y}">${labelText}</text>`;
        }
      }
    }

    this.data.forEach((item, index) => {
      const barHeight = barHeights[index] || normalizeCoordinate(item.value, minY, maxY, this.minBarHeight || 0, chartHeight);
      const barWidth = barWidths[index];
      const x = this.padding + spacing + index * (barWidth + spacing);
      const y = this.height - this.padding - barHeight;

      // Custom color gradients using chroma-js
      const gradientId = `bar-gradient-${index}`;
      const baseColor = this.barColor || this.colors[index] || getColor(index, this.colorPalette);
      const hoverColor = this.barHoverColor || adjustColorBrightness(baseColor, -0.1);

      // Add gradient definition with enhanced colors
      svg += `<defs>
        ${createGradient(baseColor, adjustColorBrightness(baseColor, -0.2), gradientId, 'vertical')}
      </defs>`;

      svg += SVGFactory.createGroup({ class: 'bar-group' });

      // Main bar with gradient
      svg += `<rect class="bar" x="${x}" y="${y}" width="${barWidth}" height="${barHeight}"
              fill="url(#${gradientId})" rx="${this.barBorderRadius}" />`;

      // Add hover value label (conditional)
      if (this.hoverEffects) {
        svg += `<text class="value-label" x="${x + barWidth/2}" y="${y - 8}"
                text-anchor="middle" fill="${this.textColor}" font-weight="bold" font-size="${this.tooltipFontSize}">
                ${item.value}
                </text>`;
      }

      // Add tooltip (conditional)
      if (this.showTooltips) {
        const rawLabelText = item.label || `Item ${index + 1}`;
        const labelText = this.tooltipLabelFormat ? this.tooltipLabelFormat(rawLabelText) : rawLabelText;
        const valueText = this.tooltipValueFormat ? this.tooltipValueFormat(item.value) : item.value.toString();
        const titleText = this.tooltipTitleFormat ? this.tooltipTitleFormat(item, index) : labelText;

        const tooltipWidth = 140;
        const tooltipHeight = 60;
        const tooltipX = x + barWidth/2 - tooltipWidth/2;
        const tooltipY = y - tooltipHeight - 12;

        // Check if custom tooltip content is provided
        if (this.tooltipCustomContent) {
          svg += this.tooltipCustomContent(item, index, baseColor, tooltipX, tooltipY, tooltipWidth, tooltipHeight);
        } else {
          // Default tooltip content
          svg += `<g class="tooltip">
            <rect class="tooltip-rect" x="${tooltipX}" y="${tooltipY}" width="${tooltipWidth}" height="${tooltipHeight}" />

            <text class="tooltip-title" x="${tooltipX + 12}" y="${tooltipY + 22}">${titleText}</text>

            <rect class="tooltip-marker" x="${tooltipX + 12}" y="${tooltipY + 34}" width="10" height="10" fill="${baseColor}" />
            <text class="tooltip-label" x="${tooltipX + 28}" y="${tooltipY + 43}">Value</text>
            <text class="tooltip-value" x="${tooltipX + tooltipWidth - 12}" y="${tooltipY + 43}">${valueText}</text>
          </g>`;
        }
      }

      // Add X-axis labels (conditional)
      if (this.showXAxis && this.showLabels && item.label) {
        const labelText = this.xAxisLabelFormat ? this.xAxisLabelFormat(item.label) : item.label;
        svg += `<text class="x-axis-label" x="${x + barWidth/2}" y="${this.height - this.padding + 15}"
                text-anchor="middle" font-size="${this.axisLabelFontSize}" fill="${this.axisColor}">${labelText}</text>`;
      }

      svg += SVGFactory.closeGroup();
    });

    svg += SVGFactory.closeGroup();
    svg += SVGFactory.closeSVG();

    return svg;
  }
}

module.exports = BarChart;
