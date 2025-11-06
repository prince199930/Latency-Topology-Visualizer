'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

export function Globe() {
  const globeRef = useRef<THREE.Mesh>(null);

  // 🗺️ Load textures (make sure they are in /public/textures/)
  const [colorMap, bumpMap, specularMap] = useLoader(THREE.TextureLoader, [
    '/textures/earthmap1k.jpg',      // Color (daytime) map
    '/textures/earthbump1k.jpg',        // Elevation map (mountains, valleys)
    '/textures/earthspec1k.jpg'     // Specular map (water reflection)
  ]);


  // 🌍 Slowly rotate the globe
  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.0008;
    }
  });

  // ✨ Create atmosphere material (glow effect)
  const atmosphereMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.8 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 6.0);
          gl_FragColor = vec4(0.2, 0.5, 1.0, 1.0) * intensity;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
  }, []);

  return (
    <>
      {/* 🌎 Earth Sphere */}
      <Sphere ref={globeRef} args={[2, 64, 64]}>
        <meshPhongMaterial
          map={colorMap}
          bumpMap={bumpMap}
          bumpScale={0.05}
          specularMap={specularMap}
          specular={new THREE.Color('gray')}
          shininess={10}
        />
      </Sphere>

      {/* ☁️ Subtle glow layer */}
      <Sphere args={[2.05, 64, 64]}>
        <primitive object={new THREE.MeshStandardMaterial({
          color: '#3b82f6',
          transparent: true,
          opacity: 0.05,
          side: THREE.BackSide,
        })} />
      </Sphere>

      {/* 💫 Atmosphere Shader Layer */}
      <Sphere args={[2.15, 64, 64]}>
        <primitive object={atmosphereMaterial} />
      </Sphere>

      {/* 🌀 Orbit controls for interaction */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        minDistance={3}
        maxDistance={15}
        autoRotate={false}
      />

      {/* 💡 Lights */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 3, 5]} intensity={1.2} />
    </>
  );
}
