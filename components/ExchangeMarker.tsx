'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { ExchangeServer } from '@/types';
import { useAppStore } from '@/store/useAppStore';

interface ExchangeMarkerProps {
  exchange: ExchangeServer;
}

const CLOUD_COLORS = {
  AWS: '#FF9900',
  GCP: '#4285F4',
  Azure: '#0078D4'
};

function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

export function ExchangeMarker({ exchange }: ExchangeMarkerProps) {
  const markerRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const setSelectedExchange = useAppStore(state => state.setSelectedExchange);
  const selectedExchange = useAppStore(state => state.selectedExchange);
  
  const position = latLonToVector3(exchange.latitude, exchange.longitude, 2.05);
  const isSelected = selectedExchange?.id === exchange.id;

  useFrame((state) => {
    if (markerRef.current && (hovered || isSelected)) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
      markerRef.current.scale.setScalar(scale);
    } else if (markerRef.current) {
      markerRef.current.scale.setScalar(1);
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={markerRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setSelectedExchange(isSelected ? null : exchange)}
      >
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial
          color={CLOUD_COLORS[exchange.cloudProvider]}
          emissive={CLOUD_COLORS[exchange.cloudProvider]}
          emissiveIntensity={hovered || isSelected ? 1 : 0.5}
        />
      </mesh>

      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.002, 0.002, 0.1, 8]} />
        <meshBasicMaterial
          color={CLOUD_COLORS[exchange.cloudProvider]}
          transparent
          opacity={0.6}
        />
      </mesh>

      {(hovered || isSelected) && (
        <Html distanceFactor={6}>
          <div className="bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg border border-gray-700 min-w-[200px] pointer-events-none">
            <div className="font-bold text-sm">{exchange.name}</div>
            <div className="text-xs text-gray-300 mt-1">{exchange.location}</div>
            <div className="flex items-center gap-2 mt-1">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: CLOUD_COLORS[exchange.cloudProvider] }}
              />
              <span className="text-xs">{exchange.cloudProvider}</span>
            </div>
            <div className="text-xs text-gray-400 mt-1">{exchange.region}</div>
          </div>
        </Html>
      )}
    </group>
  );
}
