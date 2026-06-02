import { useState } from 'react';

export function useSceneObjects() {
  const [objects, setObjects] = useState([]);

  const addObject = (type) => {
    const newObj = {
      id: Date.now().toString(),
      type,
      position: [(Math.random() * 6) - 3, 0.5, (Math.random() * 4) - 2]
    };
    setObjects([...objects, newObj]);
  };

  const updateObjectPosition = (id, newPosition) => {
    setObjects(prev => prev.map(obj => 
      obj.id === id ? { ...obj, position: newPosition } : obj
    ));
  };

  return { objects, setObjects, addObject, updateObjectPosition };
}
