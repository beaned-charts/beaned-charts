// Bean-Charts TypeScript Definitions

export interface ChartDataPoint {
  label?: string;
  value: number;
}

export interface BaseChartOptions {
  width?: number;
  height?: number;
  colors?: string[];
}

export interface BarChartOptions extends BaseChartOptions {
  padding?: number;
  showLabels?: boolean;
  barSpacing?: number;
}

export interface LineChartOptions extends BaseChartOptions {
  padding?: number;
  color?: string;
  smooth?: boolean;
  showPoints?: boolean;
  fill?: boolean;
}

export interface PieChartOptions extends BaseChartOptions {
  holeSize?: number;
  showLabels?: boolean;
}

export declare class BarChart {
  constructor(data: ChartDataPoint[], options?: BarChartOptions);
  render(): string;
}

export declare class LineChart {
  constructor(data: ChartDataPoint[], options?: LineChartOptions);
  render(): string;
  private createSmoothPath(points: string[]): string;
}

export declare class PieChart {
  constructor(data: ChartDataPoint[], options?: PieChartOptions);
  render(): string;
  private createSlicePath(centerX: number, centerY: number, outerRadius: number, innerRadius: number, startAngle: number, endAngle: number): string;
}

export declare class SVGFactory {
  static createSVG(width: number, height: number, viewBox?: string | null): string;
  static closeSVG(): string;
  static createGroup(attributes?: { [key: string]: any }): string;
  static closeGroup(): string;
}

export declare function getColor(index: number, palette?: string): string;
export declare function normalizeCoordinate(value: number, min: number, max: number, targetMin: number, targetMax: number): number;
export declare function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number): string;

export declare class ReactChartComponents {
  static createAreaChart(data: any[], options?: any): string;
  static createBarChart(data: any[], options?: any): string;
  static createLineChart(data: any[], options?: any): string;
  private static createAreaPath(data: any[], dataKey: string, margin: any, chartWidth: number, chartHeight: number, maxValue: number, minDate: Date, maxDate: Date): string;
  private static createAxes(data: any[], margin: any, chartWidth: number, chartHeight: number, minDate: Date, maxDate: Date): string;
  private static createSmoothPath(points: any[]): string;
}
