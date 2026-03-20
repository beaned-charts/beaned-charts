// Beaned-Charts Utilities
// Enhanced utility functions with chroma-js for beautiful color palettes

const chroma = require('chroma-js');
const { schemeSet3, schemeCategory10 } = require('d3-scale-chromatic');
const _ = require('lodash');

class SVGFactory {
  static createSVG(width, height, viewBox = null) {
    const vb = viewBox || `0 0 ${width} ${height}`;
    return `<svg width="${width}" height="${height}" viewBox="${vb}" xmlns="http://www.w3.org/2000/svg">`;
  }

  static closeSVG() {
    return '</svg>';
  }

  static createGroup(attributes = {}) {
    const attrs = Object.entries(attributes)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ');
    return `<g ${attrs}>`;
  }

  static closeGroup() {
    return '</g>';
  }
}

function normalizeCoordinate(value, min, max, targetMin, targetMax) {
  return ((value - min) / (max - min)) * (targetMax - targetMin) + targetMin;
}

function describeArc(x, y, radius, startAngle, endAngle) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M", start.x, start.y,
    "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
  ].join(" ");
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function getColor(index, palette = 'default') {
  const palettes = {
    default: schemeCategory10,
    vibrant: schemeSet3,
    sunset: ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd'],
    ocean: ['#0077b6', '#00b4d8', '#90e0ef', '#caf0f8', '#03045e', '#023e8a'],
    forest: ['#2d6a4f', '#40916c', '#52b788', '#74c69d', '#95d5b2', '#b7e4c7'],
    purple: ['#7209b7', '#b5179e', '#f72585', '#480ca8', '#560bad', '#3a0ca3']
  };

  const selectedPalette = palettes[palette] || palettes.default;
  return selectedPalette[index % selectedPalette.length];
}

function createGradient(startColor, endColor, id, direction = 'vertical') {
  const x1 = direction === 'horizontal' ? '0%' : '0%';
  const y1 = direction === 'horizontal' ? '0%' : '0%';
  const x2 = direction === 'horizontal' ? '100%' : '0%';
  const y2 = direction === 'horizontal' ? '0%' : '100%';

  return `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">
    <stop offset="0%" stop-color="${startColor}" stop-opacity="1"/>
    <stop offset="100%" stop-color="${endColor}" stop-opacity="1"/>
  </linearGradient>`;
}

function createAreaGradient(color, id) {
  const lighter = chroma(color).brighten(0.5).hex();
  const darker = chroma(color).darken(0.2).hex();

  return `<linearGradient id="${id}" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" stop-color="${color}" stop-opacity="0.8"/>
    <stop offset="100%" stop-color="${darker}" stop-opacity="0.1"/>
  </linearGradient>`;
}

function adjustColorBrightness(hex, percent) {
  return chroma(hex).brighten(percent).hex();
}

function getComplementaryColor(color) {
  return chroma(color).complement().hex();
}

function getAnalogousColors(color, count = 3) {
  return chroma.scale([color, chroma(color).rotate(90)]).mode('lch').colors(count);
}

function formatNumber(num, decimals = 2) {
  return _.round(num, decimals);
}

function formatCurrency(num, currency = 'USD') {
  return new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: currency 
  }).format(num);
}

module.exports = {
  SVGFactory,
  normalizeCoordinate,
  describeArc,
  polarToCartesian,
  getColor,
  createGradient,
  createAreaGradient,
  adjustColorBrightness,
  getComplementaryColor,
  getAnalogousColors,
  formatNumber,
  formatCurrency
};
