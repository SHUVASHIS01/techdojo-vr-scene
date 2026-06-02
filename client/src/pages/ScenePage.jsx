import { useState, useEffect } from 'react';
import Scene from '../components/Scene';
import Toolbar from '../components/Toolbar';
import AddObjectDialog from '../components/AddObjectDialog';
import Toast from '../components/Toast';
import { useSceneObjects } from '../hooks/useSceneObjects';
import { useAuth } from '../hooks/useAuth';
import * as sceneApi from '../api/sceneApi';

export default function ScenePage() {
  const { objects, setObjects, addObject, updateObjectPosition } = useSceneObjects();
  const { logout } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    sceneApi.loadScene()
      .then(data => {
        setObjects(data.objects || []);
      })
      .catch(err => {
        setToast({ message: 'Failed to load scene', type: 'error' });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setObjects]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await sceneApi.saveScene(objects);
      setToast({ message: 'Scene saved successfully!', type: 'success' });
    } catch (err) {
      setToast({ message: 'Failed to save scene', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Toolbar 
        onAddClick={() => setIsDialogOpen(true)} 
        onSaveClick={handleSave} 
        onLogoutClick={logout} 
        saving={saving}
      />
      
      {isDialogOpen && (
        <AddObjectDialog 
          onAdd={addObject} 
          onClose={() => setIsDialogOpen(false)} 
        />
      )}

      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}

      {loading && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1a1a2e', zIndex: 5, color: '#fff' }}>
          Loading scene...
        </div>
      )}

      {!loading && objects.length === 0 && (
        <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.5)', zIndex: 5, pointerEvents: 'none' }}>
          Add your first object!
        </div>
      )}

      <Scene objects={objects} updateObjectPosition={updateObjectPosition} />
    </div>
  );
}
