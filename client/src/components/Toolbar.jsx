export default function Toolbar({ onAddClick, onSaveClick, onLogoutClick, saving }) {
  return (
    <>
      <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10 }}>
        <button 
          onClick={onSaveClick}
          disabled={saving}
          style={{ 
            padding: '8px 24px', 
            borderRadius: '999px', 
            backgroundColor: '#ed1c24', 
            color: '#fff', 
            border: '3px solid #000', 
            cursor: saving ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '15px'
          }}
        >
          {saving ? 'Saving...' : 'Save'} <span style={{fontWeight: '900'}}>&gt;</span>
        </button>
      </div>
      <div style={{ position: 'absolute', top: 20, right: 20, zIndex: 10, display: 'flex', gap: '15px' }}>
        <button 
          onClick={onAddClick}
          style={{ 
            padding: '8px 24px', 
            borderRadius: '999px', 
            backgroundColor: '#ed1c24', 
            color: '#fff', 
            border: '3px solid #000', 
            cursor: 'pointer',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '15px'
          }}
        >
          <span style={{fontWeight: '900'}}>&lt;</span> Add Object
        </button>
        <button 
          onClick={onLogoutClick}
          style={{ 
            padding: '8px 20px', 
            borderRadius: '8px', 
            backgroundColor: 'rgba(0,0,0,0.4)', 
            color: '#fff', 
            border: '1px solid rgba(255,255,255,0.2)', 
            cursor: 'pointer' 
          }}
        >
          Logout
        </button>
      </div>
    </>
  );
}
