'use client';

import { Search, Filter } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { CloudProvider } from '@/types';

const CLOUD_PROVIDERS: CloudProvider[] = ['AWS', 'GCP', 'Azure'];
const EXCHANGES = ['Binance', 'OKX', 'Bybit', 'Deribit', 'Kraken', 'Coinbase', 'Huobi', 'KuCoin', 'Bitfinex'];

export function ControlPanel() {
  const filters = useAppStore(state => state.filters);
  const setFilters = useAppStore(state => state.setFilters);

  const toggleCloudProvider = (provider: CloudProvider) => {
    const current = filters.cloudProviders;
    const updated = current.includes(provider)
      ? current.filter(p => p !== provider)
      : [...current, provider];
    setFilters({ cloudProviders: updated });
  };

  const toggleExchange = (exchange: string) => {
    const current = filters.exchanges;
    const updated = current.includes(exchange)
      ? current.filter(e => e !== exchange)
      : [...current, exchange];
    setFilters({ exchanges: updated });
  };

  return (
    <div className="absolute top-4 left-4 bg-gray-900/90 backdrop-blur-sm text-white rounded-lg p-4 shadow-xl border border-gray-700 max-w-sm z-10">
      <div className="flex items-center gap-2 mb-4">
        <Filter size={20} />
        <h2 className="font-bold text-lg">Controls</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search exchanges..."
              value={filters.searchQuery}
              onChange={(e) => setFilters({ searchQuery: e.target.value })}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Cloud Providers</label>
          <div className="flex flex-wrap gap-2">
            {CLOUD_PROVIDERS.map(provider => (
              <button
                key={provider}
                onClick={() => toggleCloudProvider(provider)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  filters.cloudProviders.includes(provider)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-400'
                }`}
              >
                {provider}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Exchanges</label>
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
            {EXCHANGES.map(exchange => (
              <button
                key={exchange}
                onClick={() => toggleExchange(exchange)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  filters.exchanges.length === 0 || filters.exchanges.includes(exchange)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-400'
                }`}
              >
                {exchange}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Latency Range: {filters.latencyRange[0]}ms - {filters.latencyRange[1]}ms
          </label>
          <input
            type="range"
            min="0"
            max="500"
            value={filters.latencyRange[1]}
            onChange={(e) => setFilters({ 
              latencyRange: [filters.latencyRange[0], parseInt(e.target.value)] 
            })}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.showRealTime}
              onChange={(e) => setFilters({ showRealTime: e.target.checked })}
              className="w-4 h-4"
            />
            <span className="text-sm">Show Real-time Connections</span>
          </label>
          
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.showRegions}
              onChange={(e) => setFilters({ showRegions: e.target.checked })}
              className="w-4 h-4"
            />
            <span className="text-sm">Show Cloud Regions</span>
          </label>
        </div>
      </div>
    </div>
  );
}
