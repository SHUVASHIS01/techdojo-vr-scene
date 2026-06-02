import { useState } from 'react';

export function useSceneObjects() {
  const [objects, setObjects] = useState([]);

  const addObject = (type) => {
    const id = crypto.randomUUID();
    const position = [
      Math.random() * 8 - 4,
      0.5,
      Math.random() * 8 - 4
    ];
    setObjects(prev => [...prev, { id, type, position }]);
  };

  const updateObjectPosition = (id, newPosition) => {
    setObjects(prev => prev.map(obj => 
      obj.id === id ? { ...obj, position: newPosition } : obj
    ));
  };

  return { objects, setObjects, addObject, updateObjectPosition };
}
