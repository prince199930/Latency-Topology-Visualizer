import { create } from 'zustand';
import { FilterState, LatencyData, ExchangeServer, TimeRange, PerformanceMetrics } from '@/types';
import { exchanges } from '@/data/exchanges';

interface AppState {
  filters: FilterState;
  selectedExchange: ExchangeServer | null;
  selectedPair: { from: string; to: string } | null;
  timeRange: TimeRange;
  latencyData: LatencyData[];
  performanceMetrics: PerformanceMetrics;
  setFilters: (filters: Partial<FilterState>) => void;
  setSelectedExchange: (exchange: ExchangeServer | null) => void;
  setSelectedPair: (pair: { from: string; to: string } | null) => void;
  setTimeRange: (range: TimeRange) => void;
  setLatencyData: (data: LatencyData[]) => void;
  updatePerformanceMetrics: (metrics: Partial<PerformanceMetrics>) => void;
  getFilteredExchanges: () => ExchangeServer[];
}

export const useAppStore = create<AppState>((set, get) => ({
  filters: {
    exchanges: [],
    cloudProviders: ['AWS', 'GCP', 'Azure'],
    latencyRange: [0, 500],
    showRealTime: true,
    showHistorical: false,
    showRegions: true,
    searchQuery: ''
  },
  selectedExchange: null,
  selectedPair: null,
  timeRange: '24h',
  latencyData: [],
  performanceMetrics: {
    fps: 60,
    activeConnections: 0,
    totalExchanges: exchanges.length,
    averageLatency: 0
  },
  
  setFilters: (newFilters) => 
    set((state) => ({ 
      filters: { ...state.filters, ...newFilters } 
    })),
  
  setSelectedExchange: (exchange) => 
    set({ selectedExchange: exchange }),
  
  setSelectedPair: (pair) => 
    set({ selectedPair: pair }),
  
  setTimeRange: (range) => 
    set({ timeRange: range }),
  
  setLatencyData: (data) => 
    set({ latencyData: data }),
  
  updatePerformanceMetrics: (metrics) =>
    set((state) => ({
      performanceMetrics: { ...state.performanceMetrics, ...metrics }
    })),
  
  getFilteredExchanges: () => {
    const { filters } = get();
    let filtered = exchanges;
    
    if (filters.cloudProviders.length < 3) {
      filtered = filtered.filter(e => 
        filters.cloudProviders.includes(e.cloudProvider)
      );
    }
    
    if (filters.exchanges.length > 0) {
      filtered = filtered.filter(e => 
        filters.exchanges.includes(e.name)
      );
    }
    
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(e =>
        e.name.toLowerCase().includes(query) ||
        e.location.toLowerCase().includes(query) ||
        e.cloudProvider.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }
}));
