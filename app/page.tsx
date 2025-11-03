'use client';

import { useEffect, useRef } from 'react';
import { Scene } from '@/components/Scene';
import { ControlPanel } from '@/components/ControlPanel';
import { Legend } from '@/components/Legend';
import { PerformanceMetrics } from '@/components/PerformanceMetrics';
import { HistoricalChart } from '@/components/HistoricalChart';
import { useAppStore } from '@/store/useAppStore';
import { generateRealtimeLatency } from '@/utils/latencySimulator';
import { exchanges } from '@/data/exchanges';

export default function Home() {
  const setLatencyData = useAppStore(state => state.setLatencyData);
  const updatePerformanceMetrics = useAppStore(state => state.updatePerformanceMetrics);
  const intervalRef = useRef<NodeJS.Timeout>();
  const fpsRef = useRef({ frames: 0, lastTime: Date.now() });

  useEffect(() => {
    const updateLatency = () => {
      const latencies = generateRealtimeLatency(exchanges);
      setLatencyData(latencies);
    };

    updateLatency();
    intervalRef.current = setInterval(updateLatency, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [setLatencyData]);

  useEffect(() => {
    const updateFPS = () => {
      fpsRef.current.frames++;
      const now = Date.now();
      const delta = now - fpsRef.current.lastTime;

      if (delta >= 1000) {
        const fps = Math.round((fpsRef.current.frames * 1000) / delta);
        updatePerformanceMetrics({ fps });
        fpsRef.current.frames = 0;
        fpsRef.current.lastTime = now;
      }

      requestAnimationFrame(updateFPS);
    };

    const rafId = requestAnimationFrame(updateFPS);
    return () => cancelAnimationFrame(rafId);
  }, [updatePerformanceMetrics]);

  return (
    <main className="w-screen h-screen bg-gradient-to-b from-gray-900 via-blue-900/20 to-gray-900">
      <div className="absolute top-0 left-0 w-full h-full">
        <Scene />
      </div>
      
      <ControlPanel />
      <Legend />
      <PerformanceMetrics />
      <HistoricalChart />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-0">
        <h1 className="text-4xl font-bold text-white/10 mb-2">
          Crypto Exchange Latency Map
        </h1>
        <p className="text-lg text-white/5">
          Real-time Visualization
        </p>
      </div>
    </main>
  );
}
