import './App.css';

function App() {
  return (
    <div className="App">
      <header style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #10b981 100%)', color: 'white', padding: '2rem', textAlign: 'center' }}>
        <h1>Recipe Room</h1>
        <p>Share and discover simple recipes</p>
      </header>
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Welcome!</h2>
        <p>Your Recipe Room app is working</p>
        <div style={{ marginTop: '2rem' }}>
          <a href="/login" style={{ margin: '10px', padding: '10px 20px', background: '#10b981', color: 'white', textDecoration: 'none', borderRadius: '8px', display: 'inline-block' }}>Login</a>
          <a href="/register" style={{ margin: '10px', padding: '10px 20px', background: '#8b5cf6', color: 'white', textDecoration: 'none', borderRadius: '8px', display: 'inline-block' }}>Register</a>
        </div>
      </div>
    </div>
  );
}

export default App;