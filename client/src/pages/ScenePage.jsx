import { useState } from 'react';
import Scene from '../components/Scene';
import Toolbar from '../components/Toolbar';
import AddObjectDialog from '../components/AddObjectDialog';
import { useSceneObjects } from '../hooks/useSceneObjects';
import { useAuth } from '../hooks/useAuth';

export default function ScenePage() {
  const { objects, addObject, updateObjectPosition } = useSceneObjects();
  const { logout } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Toolbar 
        onAddClick={() => setIsDialogOpen(true)} 
        onSaveClick={() => {}} 
        onLogoutClick={logout} 
      />
      
      {isDialogOpen && (
        <AddObjectDialog 
          onAdd={addObject} 
          onClose={() => setIsDialogOpen(false)} 
        />
      )}

      <Scene objects={objects} updateObjectPosition={updateObjectPosition} />
    </div>
  );
}
