'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { ControlPanel } from '@/components/ControlPanel';
import { Legend } from '@/components/Legend';
import { PerformanceMetrics } from '@/components/PerformanceMetrics';
import { HistoricalChart } from '@/components/HistoricalChart';
import { useAppStore } from '@/store/useAppStore';
import { generateRealtimeLatency } from '@/utils/latencySimulator';
import { exchanges } from '@/data/exchanges';

const Scene = dynamic(() => import('@/components/Scene').then(mod => ({ default: mod.Scene })), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-full">
      <div className="text-white">Loading 3D Visualization...</div>
    </div>
  )
});

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const setLatencyData = useAppStore(state => state.setLatencyData);
  const updatePerformanceMetrics = useAppStore(state => state.updatePerformanceMetrics);
  const intervalRef = useRef<NodeJS.Timeout>();
  const fpsRef = useRef({ frames: 0, lastTime: Date.now() });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const updateLatency = () => {
      const latencies = generateRealtimeLatency(exchanges);
      setLatencyData(latencies);
      
      const avgLatency = latencies.length > 0
        ? latencies.reduce((sum, l) => sum + l.latency, 0) / latencies.length
        : 0;
      
      updatePerformanceMetrics({ 
        activeConnections: latencies.length,
        averageLatency: Math.round(avgLatency * 10) / 10
      });
    };

    updateLatency();
    intervalRef.current = setInterval(updateLatency, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [setLatencyData, updatePerformanceMetrics]);

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

  if (!mounted) {
    return (
      <main className="w-screen h-screen bg-gradient-to-b from-gray-900 via-blue-900/20 to-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </main>
    );
  }

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
