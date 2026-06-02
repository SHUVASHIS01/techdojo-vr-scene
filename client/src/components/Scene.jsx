import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import SceneObject from './SceneObject';

export default function Scene({ objects = [], updateObjectPosition }) {
  const [controlsEnabled, setControlsEnabled] = useState(true);

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#1a1a2e' }}>
      <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="#16213e" />
        </mesh>
        <gridHelper args={[100, 100, '#e63946', '#2a2a4e']} position={[0, 0.01, 0]} />

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
