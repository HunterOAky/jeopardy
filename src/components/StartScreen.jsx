export default function StartScreen({ data = {}, setData = () => {}, submit = () => {}, setApiKey = () => {} }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInputApiKeyChange = (e) => {
    const { value } = e.target;
    setApiKey(value);
  };

  return (
    <div style={{
      padding: '16px',
      maxWidth: '400px',
      margin: '0 auto'
    }}>
      <h1 style={{
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '16px'
      }}>
        Initiate Game
      </h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input
          type="text"
          name="cat1"
          value={data.cat1 || ''}
          onChange={handleInputChange}
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px'
          }}
          placeholder="Category 1"
        />
        <input
          type="text"
          name="cat2"
          value={data.cat2 || ''}
          onChange={handleInputChange}
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px'
          }}
          placeholder="Category 2"
        />
        <input
          type="text"
          name="cat3"
          value={data.cat3 || ''}
          onChange={handleInputChange}
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px'
          }}
          placeholder="Category 3"
        />
        <input
          type="text"
          name="cat4"
          value={data.cat4 || ''}
          onChange={handleInputChange}
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px'
          }}
          placeholder="Category 4"
        />
        <input
          type="text"
          name="cat5"
          value={data.cat5 || ''}
          onChange={handleInputChange}
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px'
          }}
          placeholder="Category 5"
        />
        <input
          type="text"
          name="apiKey"
          onChange={handleInputApiKeyChange}
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px'
          }}
          placeholder="OpenAI Key"
        />
        <button
        onClick={submit}>
          Start
        </button>
      </div>
    </div>
  );
}