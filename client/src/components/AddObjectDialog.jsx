import { useState } from 'react';

export default function AddObjectDialog({ onAdd, onClose }) {
  const [selectedType, setSelectedType] = useState('cube');

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 20 }}>
      <div style={{ backgroundColor: '#16213e', padding: '2rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', minWidth: '300px' }}>
        <h3 style={{ marginBottom: '1rem' }}>Add Object</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <input type="radio" name="objectType" value="cube" checked={selectedType === 'cube'} onChange={(e) => setSelectedType(e.target.value)} />
            Cube
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <input type="radio" name="objectType" value="sphere" checked={selectedType === 'sphere'} onChange={(e) => setSelectedType(e.target.value)} />
            Sphere
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <input type="radio" name="objectType" value="model1" checked={selectedType === 'model1'} onChange={(e) => setSelectedType(e.target.value)} />
            Custom Model 1 (Box)
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <input type="radio" name="objectType" value="model2" checked={selectedType === 'model2'} onChange={(e) => setSelectedType(e.target.value)} />
            Custom Model 2 (Avocado)
          </label>
        </div>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ padding: '8px 16px', borderRadius: '8px', backgroundColor: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', cursor: 'pointer' }}>Cancel</button>
          <button onClick={() => { onAdd(selectedType); onClose(); }} style={{ padding: '8px 16px', borderRadius: '8px', backgroundColor: '#e63946', color: '#fff', border: 'none', cursor: 'pointer' }}>Add</button>
        </div>
      </div>
    </div>
  );
}
