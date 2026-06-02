import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import SceneObject from './SceneObject';
import heroBg from '../assets/hero.png';

export default function Scene({ objects = [], updateObjectPosition }) {
  const [controlsEnabled, setControlsEnabled] = useState(true);

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      backgroundColor: '#1a1a2e',
      backgroundImage: `url(${heroBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        {/* Invisible floor plane for raycasting */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} visible={false}>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial />
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

        <OrbitControls makeDefault enabled={controlsEnabled} />
      </Canvas>
    </div>
  );
}
