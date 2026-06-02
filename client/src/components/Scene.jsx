import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, SoftShadows } from '@react-three/drei';
import * as THREE from 'three';
import SceneObject from './SceneObject';

export default function Scene({ objects = [], updateObjectPosition }) {
  const [controlsEnabled, setControlsEnabled] = useState(true);

  return (
    <Canvas 
      camera={{ position: [0, 3, 8], fov: 50 }}
      gl={{ alpha: true }}
      style={{ background: 'transparent', position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1 }}
      shadows
    >
      <SoftShadows size={15} samples={10} focus={0.5} />
      <ambientLight intensity={0.8} />
      <directionalLight 
        position={[-10, 10, 5]} 
        intensity={1} 
        castShadow 
        shadow-mapSize={[1024, 1024]}
      />
      
      {/* Invisible floor plane for raycasting */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} visible={false}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial transparent opacity={0} />
      </mesh>

      <Environment preset="city" />
      
      {objects.map(obj => (
        <SceneObject 
          key={obj.id} 
          {...obj} 
          updatePosition={(pos) => updateObjectPosition(obj.id, pos)}
          setControlsEnabled={setControlsEnabled}
        />
      ))}

      <OrbitControls 
        makeDefault 
        enabled={controlsEnabled} 
        enableZoom={false}
        enableRotate={false}
        enablePan={true}
        panSpeed={0.6}
        mouseButtons={{
          LEFT: THREE.MOUSE.PAN
        }}
      />
    </Canvas>
  );
}
