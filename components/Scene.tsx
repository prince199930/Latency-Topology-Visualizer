'use client';

import { Canvas } from '@react-three/fiber';
import { Globe } from './Globe';
import { ExchangeMarker } from './ExchangeMarker';
import { LatencyConnection } from './LatencyConnection';
import { useAppStore } from '@/store/useAppStore';
import { exchanges } from '@/data/exchanges';

export function Scene() {
  const filteredExchanges = useAppStore(state => state.getFilteredExchanges());
  const latencyData = useAppStore(state => state.latencyData);
  const showRealTime = useAppStore(state => state.filters.showRealTime);
  const latencyRange = useAppStore(state => state.filters.latencyRange);

  const visibleLatencies = latencyData.filter(l => {
    if (!showRealTime) return false;
    return l.latency >= latencyRange[0] && l.latency <= latencyRange[1];
  });

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <Globe />

        {filteredExchanges.map(exchange => (
          <ExchangeMarker key={exchange.id} exchange={exchange} />
        ))}

        {visibleLatencies.map(latency => {
          const fromExchange = exchanges.find(e => e.id === latency.from);
          const toExchange = exchanges.find(e => e.id === latency.to);
          
          if (!fromExchange || !toExchange) return null;
          
          if (!filteredExchanges.find(e => e.id === fromExchange.id) ||
              !filteredExchanges.find(e => e.id === toExchange.id)) {
            return null;
          }

          return (
            <LatencyConnection
              key={latency.id}
              latency={latency}
              fromExchange={fromExchange}
              toExchange={toExchange}
            />
          );
        })}
      </Canvas>
    </div>
  );
}
