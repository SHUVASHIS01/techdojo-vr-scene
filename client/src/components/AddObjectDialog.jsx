import { useState } from 'react';

export default function AddObjectDialog({ onAdd, onClose }) {
  const [selectedType, setSelectedType] = useState('cube');

  return (
    <div style={{ 
      position: 'absolute', 
      top: '70px', 
      right: '20px', 
      backgroundColor: '#ffffff', 
      padding: '24px', 
      borderRadius: '20px', 
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)', 
      zIndex: 20,
      width: '220px',
      color: '#000'
    }}>
      <style>{`
        input[type="radio"]:checked::before {
          content: "";
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #000;
        }
      `}</style>
      <h3 style={{ marginBottom: '16px', fontSize: '15px', fontWeight: 'bold' }}>Add Object</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
        {['cube', 'sphere', 'model1', 'model2'].map((type) => {
          const labels = {
            cube: 'Cube',
            sphere: 'Sphere',
            model1: 'Custom model 1',
            model2: 'Custom model 2'
          };
          return (
            <label key={type} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}>
              <input 
                type="radio" 
                name="objectType" 
                value={type} 
                checked={selectedType === type} 
                onChange={(e) => setSelectedType(e.target.value)} 
                style={{ 
                  appearance: 'none', 
                  width: '18px', 
                  height: '18px', 
                  border: '3px solid #000', 
                  borderRadius: '50%', 
                  outline: 'none',
                  display: 'grid',
                  placeContent: 'center',
                  backgroundColor: '#fff',
                  cursor: 'pointer',
                  margin: 0
                }}
              />
              {labels[type]}
            </label>
          );
        })}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button 
          onClick={() => { onAdd(selectedType); onClose(); }} 
          style={{ 
            padding: '8px 36px', 
            borderRadius: '999px', 
            backgroundColor: '#ed1c24', 
            color: '#fff', 
            border: 'none', 
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '14px'
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}
