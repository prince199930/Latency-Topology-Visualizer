export type CloudProvider = 'AWS' | 'GCP' | 'Azure';

export interface ExchangeServer {
  id: string;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  cloudProvider: CloudProvider;
  region: string;
}

export interface CloudRegion {
  id: string;
  provider: CloudProvider;
  name: string;
  code: string;
  latitude: number;
  longitude: number;
  serverCount: number;
}

export interface LatencyData {
  id: string;
  from: string;
  to: string;
  latency: number;
  timestamp: number;
}

export interface HistoricalLatency {
  timestamp: number;
  latency: number;
}

export interface LatencyStats {
  min: number;
  max: number;
  average: number;
  current: number;
}

export type TimeRange = '1h' | '24h' | '7d' | '30d';

export interface FilterState {
  exchanges: string[];
  cloudProviders: CloudProvider[];
  latencyRange: [number, number];
  showRealTime: boolean;
  showHistorical: boolean;
  showRegions: boolean;
  searchQuery: string;
}

export interface PerformanceMetrics {
  fps: number;
  activeConnections: number;
  totalExchanges: number;
  averageLatency: number;
}
