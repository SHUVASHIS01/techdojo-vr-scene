export default function Toolbar({ onAddClick, onSaveClick, onLogoutClick, saving }) {
  return (
    <>
      <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10 }}>
        <button 
          onClick={onSaveClick}
          disabled={saving}
          style={{ padding: '10px 20px', borderRadius: '8px', backgroundColor: '#e63946', color: '#fff', border: 'none', cursor: saving ? 'not-allowed' : 'pointer' }}
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>
      <div style={{ position: 'absolute', top: 20, right: 20, zIndex: 10, display: 'flex', gap: '10px' }}>
        <button 
          onClick={onAddClick}
          style={{ padding: '10px 20px', borderRadius: '8px', backgroundColor: '#e63946', color: '#fff', border: 'none', cursor: 'pointer' }}
        >
          Add Object
        </button>
        <button 
          onClick={onLogoutClick}
          style={{ padding: '10px 20px', borderRadius: '8px', backgroundColor: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', cursor: 'pointer' }}
        >
          Logout
        </button>
      </div>
    </>
  );
}
