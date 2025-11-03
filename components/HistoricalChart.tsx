'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { X, TrendingUp } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { TimeRange, HistoricalLatency } from '@/types';
import { generateHistoricalData } from '@/utils/latencySimulator';
import { exchanges } from '@/data/exchanges';

export function HistoricalChart() {
  const selectedPair = useAppStore(state => state.selectedPair);
  const timeRange = useAppStore(state => state.timeRange);
  const setSelectedPair = useAppStore(state => state.setSelectedPair);
  const setTimeRange = useAppStore(state => state.setTimeRange);
  const [data, setData] = useState<HistoricalLatency[]>([]);

  useEffect(() => {
    if (selectedPair) {
      const fromExchange = exchanges.find(e => e.id === selectedPair.from);
      const toExchange = exchanges.find(e => e.id === selectedPair.to);

      if (fromExchange && toExchange) {
        const hours = {
          '1h': 1,
          '24h': 24,
          '7d': 168,
          '30d': 720
        }[timeRange];

        const historicalData = generateHistoricalData(
          selectedPair.from,
          selectedPair.to,
          fromExchange,
          toExchange,
          hours
        );

        setData(historicalData);
      }
    }
  }, [selectedPair, timeRange]);

  if (!selectedPair) return null;

  const fromExchange = exchanges.find(e => e.id === selectedPair.from);
  const toExchange = exchanges.find(e => e.id === selectedPair.to);

  const stats = data.length > 0 ? {
    min: Math.min(...data.map(d => d.latency)),
    max: Math.max(...data.map(d => d.latency)),
    avg: data.reduce((sum, d) => sum + d.latency, 0) / data.length,
    current: data[data.length - 1]?.latency || 0
  } : null;

  const chartData = data.map(d => ({
    time: new Date(d.timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      ...(timeRange !== '1h' && timeRange !== '24h' ? { day: '2-digit', month: 'short' } : {})
    }),
    latency: d.latency
  }));

  return (
    <div className="absolute bottom-4 right-4 bg-gray-900/90 backdrop-blur-sm text-white rounded-lg p-4 shadow-xl border border-gray-700 w-[500px] z-10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp size={20} />
          <h3 className="font-bold">Historical Latency</h3>
        </div>
        <button
          onClick={() => setSelectedPair(null)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="mb-3">
        <p className="text-sm">
          <span className="text-blue-400">{fromExchange?.name}</span>
          {' → '}
          <span className="text-green-400">{toExchange?.name}</span>
        </p>
        <p className="text-xs text-gray-400">
          {fromExchange?.location} to {toExchange?.location}
        </p>
      </div>

      <div className="flex gap-2 mb-4">
        {(['1h', '24h', '7d', '30d'] as TimeRange[]).map(range => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-3 py-1 rounded text-xs font-medium transition-all ${
              timeRange === range
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {range}
          </button>
        ))}
      </div>

      {stats && (
        <div className="grid grid-cols-4 gap-2 mb-4">
          <div className="bg-gray-800/50 rounded p-2">
            <div className="text-xs text-gray-400">Current</div>
            <div className="text-sm font-bold">{stats.current.toFixed(1)}ms</div>
          </div>
          <div className="bg-gray-800/50 rounded p-2">
            <div className="text-xs text-gray-400">Avg</div>
            <div className="text-sm font-bold">{stats.avg.toFixed(1)}ms</div>
          </div>
          <div className="bg-gray-800/50 rounded p-2">
            <div className="text-xs text-gray-400">Min</div>
            <div className="text-sm font-bold text-green-400">{stats.min.toFixed(1)}ms</div>
          </div>
          <div className="bg-gray-800/50 rounded p-2">
            <div className="text-xs text-gray-400">Max</div>
            <div className="text-sm font-bold text-red-400">{stats.max.toFixed(1)}ms</div>
          </div>
        </div>
      )}

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="time" 
              stroke="#9ca3af"
              tick={{ fontSize: 10 }}
              interval="preserveStartEnd"
            />
            <YAxis 
              stroke="#9ca3af"
              tick={{ fontSize: 10 }}
              label={{ value: 'Latency (ms)', angle: -90, position: 'insideLeft', style: { fontSize: 10 } }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="latency" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
