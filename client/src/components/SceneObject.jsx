import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export default function SceneObject({ id, type, position }) {
  const meshRef = useRef();

  if (type === 'cube') {
    return (
      <mesh ref={meshRef} position={position} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#e63946" />
      </mesh>
    );
  }

  if (type === 'sphere') {
    return (
      <mesh ref={meshRef} position={position} castShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#457b9d" />
      </mesh>
    );
  }

  if (type === 'model1') {
    return <Model path="/models/model1.glb" position={position} scale={2} />;
  }

  if (type === 'model2') {
    return <Model path="/models/model2.glb" position={position} scale={20} />;
  }

  return null;
}

function Model({ path, position, scale = 1 }) {
  const { scene } = useGLTF(path);
  return <primitive object={scene.clone()} position={position} scale={scale} castShadow />;
}
