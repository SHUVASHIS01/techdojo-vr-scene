import { useRef, useState, useMemo, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useDrag } from '@use-gesture/react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function SceneObject({ id, type, position, updatePosition, setControlsEnabled }) {
  const groupRef = useRef();
  const { camera, raycaster, pointer } = useThree();
  const [isDragging, setIsDragging] = useState(false);

  const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

  const bind = useDrag(({ active }) => {
    setIsDragging(active);
    if (active) {
      setControlsEnabled(false);
      raycaster.setFromCamera(pointer, camera);
      const intersection = new THREE.Vector3();
      raycaster.ray.intersectPlane(floorPlane, intersection);
      
      if (intersection) {
        updatePosition([intersection.x, 0.5, intersection.z]);
      }
    } else {
      setControlsEnabled(true);
    }
  }, { delay: false });

  useFrame((state) => {
    if (groupRef.current) {
      const targetScale = isDragging ? 1.2 : 1;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      
      if (isDragging) {
        groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 10) * 0.1;
      } else {
        groupRef.current.position.y = position[1];
      }
    }
  });

  // @use-gesture/react expects handlers to be spread on the mesh
  const handlers = { ...bind() };
  
  return (
    <group ref={groupRef} position={position} {...handlers}>
      <ObjectMesh type={type} isDragging={isDragging} />
    </group>
  );
}

function ObjectMesh({ type, isDragging }) {
  const materialProps = {
    emissive: '#4fc3f7',
    emissiveIntensity: isDragging ? 0.5 : 0
  };

  if (type === 'cube') {
    return (
      <mesh castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#e63946" {...materialProps} />
      </mesh>
    );
  }
  if (type === 'sphere') {
    return (
      <mesh castShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#457b9d" {...materialProps} />
      </mesh>
    );
  }
  if (type === 'model1') {
    return <Model path="/models/model1.glb" scale={1} isDragging={isDragging} />;
  }
  if (type === 'model2') {
    return <Model path="/models/model2.glb" scale={10} isDragging={isDragging} />;
  }
  return null;
}

function Model({ path, scale, isDragging }) {
  const { scene } = useGLTF(path);
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  
  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        if (!child.userData.hasClonedMaterial) {
           child.material = child.material.clone();
           child.userData.hasClonedMaterial = true;
        }
        child.material.emissive = new THREE.Color('#4fc3f7');
        child.material.emissiveIntensity = isDragging ? 0.5 : 0;
      }
    });
  }, [clonedScene, isDragging]);
  
  return <primitive object={clonedScene} scale={scale} castShadow />;
}
