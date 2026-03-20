// Beaned-Charts PieChart
// Professional pie/donut chart with interactive slices and extensive customization

const { SVGFactory, polarToCartesian, getColor, createGradient, adjustColorBrightness } = require('./utils');

class PieChart {
  constructor(data, options = {}) {
    // Core data and dimensions
    this.data = data.filter(d => d.value > 0);
    this.width = options.width || 400;
    this.height = options.height || 400;

    // Colors and themes
    this.colors = options.colors || [];
    this.colorPalette = options.colorPalette || 'default'; // New: color palette option
    this.theme = options.theme || 'light';
    this.backgroundColor = options.backgroundColor || (this.theme === 'dark' ? '#1a1a1a' : '#ffffff');
    this.textColor = options.textColor || (this.theme === 'dark' ? '#ffffff' : '#333333');
    this.sliceColor = options.sliceColor; // Override default colors
    this.tooltipBackgroundColor = options.tooltipBackgroundColor || (this.theme === 'dark' ? '#2a2a2a' : '#ffffff');
    this.tooltipTextColor = options.tooltipTextColor || (this.theme === 'dark' ? '#ffffff' : '#333333');
    this.tooltipBorderColor = options.tooltipBorderColor || (this.theme === 'dark' ? '#555555' : '#e1e5e9');

    // Fonts and text
    this.fontFamily = options.fontFamily || '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif';
    this.fontSize = options.fontSize || 12;
    this.percentageFontSize = options.percentageFontSize || 12;
    this.tooltipFontSize = options.tooltipFontSize || 11;
    this.tooltipValueFormat = options.tooltipValueFormat; // Custom tooltip value formatting
    this.tooltipLabelFormat = options.tooltipLabelFormat; // Custom tooltip label formatting
    this.tooltipPercentageFormat = options.tooltipPercentageFormat; // Custom percentage formatting

    // Chart display options
    this.showBackground = options.showBackground !== false;
    this.showLabels = options.showLabels !== false;
    this.showTooltips = options.showTooltips !== false;
    this.showCenterLabel = options.showCenterLabel !== false; // Show center label for donut charts

    // Pie customization
    this.holeSize = options.holeSize || 0; // Donut hole size (0-1)
    this.sliceBorderWidth = options.sliceBorderWidth || 2; // Border width between slices
    this.sliceBorderColor = options.sliceBorderColor || '#ffffff'; // Border color between slices
    this.sliceOpacity = options.sliceOpacity || 1; // Slice opacity
    this.explodeSlices = options.explodeSlices || false; // Explode slices on hover
    this.explodeOffset = options.explodeOffset || 5; // How far to explode slices

    // Animation and interaction
    this.animationDuration = options.animationDuration || 300; // Animation duration in ms
    this.animationEasing = options.animationEasing || 'cubic-bezier(0.4, 0, 0.2, 1)'; // Animation easing
    this.hoverEffects = options.hoverEffects !== false; // Enable hover effects

    // Center label customization (for donut charts)
    this.centerLabelText = options.centerLabelText; // Custom center label text
    this.centerLabelFontSize = options.centerLabelFontSize || 14;
    this.centerLabelColor = options.centerLabelColor || this.textColor;
  }

  render() {
    // Array to collect tooltips for rendering at the end (to ensure they appear on top)
    const tooltipsToRender = [];

    const centerX = this.width / 2;
    const centerY = this.height / 2;
    const radius = Math.min(centerX, centerY) - 40;
    const holeRadius = this.holeSize ? radius * this.holeSize : 0;

    const total = this.data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = 0;

    let svg = SVGFactory.createSVG(this.width, this.height);

    // Fully customizable styling
    svg += `<style>
      .chart-container {
        font-family: ${this.fontFamily};
        font-size: ${this.fontSize}px;
        color: ${this.textColor};
      }
      .slice {
        transition: all ${this.animationDuration}ms ${this.animationEasing};
        cursor: ${this.hoverEffects ? 'pointer' : 'default'};
        filter: ${this.hoverEffects ? 'drop-shadow(0 1px 3px rgba(0,0,0,0.08))' : 'none'};
        stroke-linejoin: round;
        fill-opacity: ${this.sliceOpacity};
        stroke: ${this.sliceBorderColor};
        stroke-width: ${this.sliceBorderWidth};
      }
      .slice:hover {
        ${this.hoverEffects ? `
          filter: drop-shadow(0 3px 8px rgba(0,0,0,0.25));
          transform-origin: ${centerX}px ${centerY}px;
          transform: scale(1.05);
          fill-opacity: ${this.sliceOpacity * 1.1};
        ` : ''}
      }
      .slice:hover.explode {
        ${this.explodeSlices ? `transform: scale(1.08);` : ''}
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
      .slice-group:hover .tooltip {
        ${this.showTooltips ? 'opacity: 1;' : ''}
      }
      .percentage-label {
        transition: all ${this.animationDuration}ms ${this.animationEasing};
        font-weight: 600;
        pointer-events: none;
        text-shadow: 0 1px 2px rgba(0,0,0,0.1);
        fill: ${this.textColor};
        font-size: ${this.percentageFontSize}px;
      }
      .slice-group:hover .percentage-label {
        ${this.hoverEffects ? `font-size: ${this.percentageFontSize + 2}px; transform: scale(1.1);` : ''}
      }
      .center-label {
        opacity: 0;
        transition: opacity ${this.animationDuration}ms ${this.animationEasing};
        font-weight: 600;
        font-size: ${this.centerLabelFontSize}px;
        fill: ${this.centerLabelColor};
        text-shadow: 0 1px 2px rgba(0,0,0,0.1);
        text-anchor: middle;
        dominant-baseline: middle;
      }
      .slice-group:hover .center-label {
        ${this.showCenterLabel && this.hoverEffects ? 'opacity: 1; transform: scale(1.05);' : ''}
      }
    </style>`;

    // Background (conditional and customizable)
    if (this.showBackground) {
      svg += `<rect width="${this.width}" height="${this.height}" fill="${this.backgroundColor}" rx="12" />`;
    }

    svg += SVGFactory.createGroup();

    this.data.forEach((item, index) => {
      const percentage = item.value / total;
      const angle = percentage * 360;

      if (percentage > 0) {
        svg += SVGFactory.createGroup({ class: 'slice-group' });

        // Create slice with hover effects
        const path = this.createSlicePath(centerX, centerY, radius, holeRadius, currentAngle, currentAngle + angle);
        const midAngle = currentAngle + angle / 2;
        const explodeX = centerX + Math.cos((midAngle - 90) * Math.PI / 180) * (this.explodeSlices ? this.explodeOffset : 0);
        const explodeY = centerY + Math.sin((midAngle - 90) * Math.PI / 180) * (this.explodeSlices ? this.explodeOffset : 0);

        svg += `<path class="slice ${this.explodeSlices ? 'explode' : ''}"
                d="${this.createSlicePath(explodeX, explodeY, radius, holeRadius, currentAngle, currentAngle + angle)}"
                fill="${this.sliceColor || this.colors[index] || getColor(index, this.colorPalette)}"
                stroke="${this.sliceBorderColor}" stroke-width="${this.sliceBorderWidth}" />`;

        // Add percentage label on slice (conditional)
        if (this.showLabels && percentage > 0.05) {
          const labelAngle = currentAngle + angle / 2;
          const labelRadius = holeRadius > 0 ? (radius + holeRadius) / 2 : radius * 0.7;
          const labelPos = polarToCartesian(explodeX, explodeY, labelRadius, labelAngle);

          svg += `<text class="percentage-label" x="${labelPos.x}" y="${labelPos.y}"
                  text-anchor="middle" dominant-baseline="middle"
                  font-size="${this.percentageFontSize}" fill="${this.textColor}" font-weight="bold">
                  ${Math.round(percentage * 100)}%
                  </text>`;
        }

        // Add hover center label for donut charts (conditional)
        if (this.showCenterLabel && this.hoverEffects && holeRadius > 0 && percentage > 0.1) {
          const centerText = this.centerLabelText || `${item.label || `Item ${index + 1}`}: ${item.value}`;
          svg += `<text class="center-label" x="${centerX}" y="${centerY}">${centerText}</text>`;
        }

        // Add tooltip to render at the end (conditional)
        if (this.showTooltips) {
          const tooltipWidth = 140;
          const tooltipHeight = 60;
          
          const labelAngle = currentAngle + angle / 2;
          const tooltipRadius = radius + 40;
          const tooltipPos = polarToCartesian(explodeX, explodeY, tooltipRadius, labelAngle);

          // Use custom formatting functions
          const rawLabelText = item.label || `Item ${index + 1}`;
          const labelText = this.tooltipLabelFormat ? this.tooltipLabelFormat(rawLabelText) : rawLabelText;
          const valueText = this.tooltipValueFormat ? this.tooltipValueFormat(item.value) : item.value.toString();
          const titleText = this.tooltipTitleFormat ? this.tooltipTitleFormat(item, index) : labelText;
          const color = this.sliceColor || this.colors[index] || getColor(index, this.colorPalette);

          // Collect tooltip for rendering at the end
          tooltipsToRender.push({
            x: tooltipPos.x - tooltipWidth/2,
            y: tooltipPos.y - tooltipHeight/2,
            width: tooltipWidth,
            height: tooltipHeight,
            title: titleText,
            label: labelText,
            value: valueText,
            color: color,
            customContent: this.tooltipCustomContent,
            item: item,
            index: index
          });
        }

        svg += SVGFactory.closeGroup();
        currentAngle += angle;
      }
    });

    svg += SVGFactory.closeGroup();

    // Render all tooltips at the very end to ensure they appear on top
    tooltipsToRender.forEach(tooltip => {
      if (tooltip.customContent) {
        svg += tooltip.customContent(tooltip.item, tooltip.index, tooltip.color, tooltip.x, tooltip.y, tooltip.width, tooltip.height);
      } else {
        // Default tooltip content
        svg += `<g class="tooltip">
          <rect class="tooltip-rect" x="${tooltip.x}" y="${tooltip.y}" width="${tooltip.width}" height="${tooltip.height}" />
          <text class="tooltip-title" x="${tooltip.x + 12}" y="${tooltip.y + 22}">${tooltip.title}</text>
          <rect class="tooltip-marker" x="${tooltip.x + 12}" y="${tooltip.y + 34}" width="10" height="10" fill="${tooltip.color}" />
          <text class="tooltip-label" x="${tooltip.x + 28}" y="${tooltip.y + 43}">Value</text>
          <text class="tooltip-value" x="${tooltip.x + tooltip.width - 12}" y="${tooltip.y + 43}">${tooltip.value}</text>
        </g>`;
      }
    });

    svg += SVGFactory.closeSVG();

    return svg;
  }

  createSlicePath(centerX, centerY, outerRadius, innerRadius, startAngle, endAngle) {
    const start = polarToCartesian(centerX, centerY, outerRadius, startAngle);
    const end = polarToCartesian(centerX, centerY, outerRadius, endAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    if (innerRadius === 0) {
      // Pie slice: start at center, line to start, arc to end, close to center
      return `M ${centerX} ${centerY} L ${start.x} ${start.y} A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${end.x} ${end.y} Z`;
    } else {
      // Donut slice: start at outer start, arc outer, line to inner start, arc inner, close
      const innerStart = polarToCartesian(centerX, centerY, innerRadius, endAngle);
      const innerEnd = polarToCartesian(centerX, centerY, innerRadius, startAngle);
      return `M ${start.x} ${start.y} A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${end.x} ${end.y} L ${innerStart.x} ${innerStart.y} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerEnd.x} ${innerEnd.y} Z`;
    }
  }
}

module.exports = PieChart;
