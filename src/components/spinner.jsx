  function Spinner({ size = 40, color = '#3498db' }) {
  const spinnerStyle = {
    width: `${size}px`,
    height: `${size}px`,
    border: `4px solid #f3f3f3`,
    borderTop: `4px solid ${color}`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  };

  const keyframes = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <div style={spinnerStyle}></div>
    </>
  );
}

// Example usage
export default function App() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: '20px',
      padding: '20px' 
    }}>
      
      <div>
        <h3>Generating Questions</h3>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Spinner size={60} color="#e74c3c" />
        </div>
      </div>
      
    </div>
  );
}