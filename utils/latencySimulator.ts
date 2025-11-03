import { LatencyData, HistoricalLatency, ExchangeServer } from '@/types';

export function calculateBaseLatency(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  const baseLatency = distance * 0.05;
  const variation = Math.random() * 10;
  return Math.max(1, baseLatency + variation);
}

export function generateRealtimeLatency(exchanges: ExchangeServer[]): LatencyData[] {
  const latencies: LatencyData[] = [];
  const timestamp = Date.now();
  
  for (let i = 0; i < exchanges.length; i++) {
    for (let j = i + 1; j < Math.min(i + 4, exchanges.length); j++) {
      const from = exchanges[i];
      const to = exchanges[j];
      
      const latency = calculateBaseLatency(
        from.latitude,
        from.longitude,
        to.latitude,
        to.longitude
      );
      
      latencies.push({
        id: `${from.id}-${to.id}`,
        from: from.id,
        to: to.id,
        latency: Math.round(latency * 10) / 10,
        timestamp
      });
    }
  }
  
  return latencies;
}

export function generateHistoricalData(
  fromId: string,
  toId: string,
  from: ExchangeServer,
  to: ExchangeServer,
  hours: number
): HistoricalLatency[] {
  const data: HistoricalLatency[] = [];
  const now = Date.now();
  const interval = (hours * 60 * 60 * 1000) / 100;
  
  const baseLatency = calculateBaseLatency(
    from.latitude,
    from.longitude,
    to.latitude,
    to.longitude
  );
  
  for (let i = 100; i >= 0; i--) {
    const timestamp = now - (i * interval);
    const variation = Math.sin(i * 0.1) * 5 + Math.random() * 3;
    const latency = Math.max(1, baseLatency + variation);
    
    data.push({
      timestamp,
      latency: Math.round(latency * 10) / 10
    });
  }
  
  return data;
}

export function getLatencyColor(latency: number): string {
  if (latency < 50) return '#10b981';
  if (latency < 150) return '#f59e0b';
  return '#ef4444';
}

export function getLatencyCategory(latency: number): 'low' | 'medium' | 'high' {
  if (latency < 50) return 'low';
  if (latency < 150) return 'medium';
  return 'high';
}
