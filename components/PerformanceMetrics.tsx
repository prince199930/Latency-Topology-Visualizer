'use client';

import { Activity, Zap, Globe2, Timer } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export function PerformanceMetrics() {
  const metrics = useAppStore(state => state.performanceMetrics);

  return (
    <div className="absolute top-4 right-4 bg-gray-900/90 backdrop-blur-sm text-white rounded-lg p-4 shadow-xl border border-gray-700 z-10">
      <div className="flex items-center gap-2 mb-3">
        <Activity size={20} />
        <h2 className="font-bold text-lg">Performance</h2>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-800/50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Zap size={16} className="text-yellow-500" />
            <span className="text-xs text-gray-400">FPS</span>
          </div>
          <div className="text-2xl font-bold">{metrics.fps}</div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Globe2 size={16} className="text-blue-500" />
            <span className="text-xs text-gray-400">Exchanges</span>
          </div>
          <div className="text-2xl font-bold">{metrics.totalExchanges}</div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Activity size={16} className="text-green-500" />
            <span className="text-xs text-gray-400">Connections</span>
          </div>
          <div className="text-2xl font-bold">{metrics.activeConnections}</div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Timer size={16} className="text-purple-500" />
            <span className="text-xs text-gray-400">Avg Latency</span>
          </div>
          <div className="text-2xl font-bold">{metrics.averageLatency}ms</div>
        </div>
      </div>
    </div>
  );
}
