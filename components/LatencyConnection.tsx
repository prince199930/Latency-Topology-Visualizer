'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { LatencyData, ExchangeServer } from '@/types';
import { getLatencyColor } from '@/utils/latencySimulator';

interface LatencyConnectionProps {
  latency: LatencyData;
  fromExchange: ExchangeServer;
  toExchange: ExchangeServer;
}

function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

export function LatencyConnection({ latency, fromExchange, toExchange }: LatencyConnectionProps) {
  const pulseRef = useRef<THREE.Mesh>(null);

  const start = latLonToVector3(fromExchange.latitude, fromExchange.longitude, 2.05);
  const end = latLonToVector3(toExchange.latitude, toExchange.longitude, 2.05);

  const curve = useMemo(() => {
    const mid = new THREE.Vector3()
      .addVectors(start, end)
      .multiplyScalar(0.5);
    
    const distance = start.distanceTo(end);
    const height = distance * 0.3 + 0.5;
    mid.normalize().multiplyScalar(2 + height);

    return new THREE.QuadraticBezierCurve3(start, mid, end);
  }, [start, end]);

  const points = useMemo(() => curve.getPoints(50), [curve]);
  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, [points]);

  const color = getLatencyColor(latency.latency);

  useFrame((state) => {
    if (pulseRef.current) {
      const t = (state.clock.elapsedTime * 0.3) % 1;
      const point = curve.getPoint(t);
      pulseRef.current.position.copy(point);
      
      const scale = 1 + Math.sin(state.clock.elapsedTime * 5) * 0.3;
      pulseRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group>
      <line geometry={lineGeometry}>
        <lineBasicMaterial
          color={color}
          transparent
          opacity={0.4}
          linewidth={2}
        />
      </line>

      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}
