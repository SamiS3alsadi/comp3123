import { useEffect, useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { increment, decrement, reset } from './redux/counterReducer';
import { login, logout, fetchProfile } from './redux/authReducer';

// read the middle part of a JWT (the payload) so we can show it
function decodeToken(token) {
  try {
    const part = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(part));
  } catch {
    return null;
  }
}

function App() {
  const dispatch = useDispatch();
  const store = useStore();
  const count = useSelector((state) => state.counter.value);
  const { token, loading, error, profile } = useSelector((state) => state.auth);

  const [username, setUsername] = useState('sami');
  const [password, setPassword] = useState('');
  const [log, setLog] = useState([]);

  // SUBSCRIBE: listen to the store and show each change on the page
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const s = store.getState();
      const line = `${new Date().toLocaleTimeString()} - counter: ${s.counter.value}, logged in: ${
        s.auth.token ? 'yes' : 'no'
      }`;
      setLog((old) => [line, ...old].slice(0, 6));
    });
    return unsubscribe;
  }, [store]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };

  const payload = token ? decodeToken(token) : null;

  return (
    <div className="container my-4">
      <h1 className="text-center mb-1">React Redux + JWT</h1>
      <p className="text-center text-muted">COMP3123 Lab Exercise 10 - Sami Al-Sadi (101571952)</p>

      <div className="row g-4">
        {/* Part 1: Redux basics */}
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-header fw-bold">1. Redux counter</div>
            <div className="card-body text-center">
              <p className="display-4">{count}</p>
              <button className="btn btn-success me-2" onClick={() => dispatch(increment())}>+1</button>
              <button className="btn btn-danger me-2" onClick={() => dispatch(decrement())}>-1</button>
              <button className="btn btn-secondary" onClick={() => dispatch(reset())}>Reset</button>
            </div>
          </div>
        </div>

        {/* Part 2: JWT login */}
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-header fw-bold">2. JWT login</div>
            <div className="card-body">
              {!token ? (
                <form onSubmit={handleLogin}>
                  <input
                    className="form-control mb-2"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <input
                    className="form-control mb-2"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button className="btn btn-primary w-100" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                  </button>
                  <small className="text-muted">Demo user: sami / password123</small>
                </form>
              ) : (
                <>
                  <p className="text-success fw-bold">Logged in as {payload?.name}</p>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => dispatch(logout())}>
                    Logout
                  </button>
                </>
              )}
              <hr />
              <button className="btn btn-dark w-100" onClick={() => dispatch(fetchProfile())}>
                Call protected route /api/profile
              </button>
              {error && <div className="alert alert-danger mt-2 mb-0">{error}</div>}
              {profile && (
                <div className="alert alert-success mt-2 mb-0">
                  {profile.message}: <b>{profile.user.name}</b> ({profile.user.role})
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Token details */}
        {token && (
          <div className="col-12">
            <div className="card">
              <div className="card-header fw-bold">3. The token (header.payload.signature)</div>
              <div className="card-body">
                <p className="text-break small font-monospace">{token}</p>
                <pre className="bg-light p-2 mb-0">{JSON.stringify(payload, null, 2)}</pre>
              </div>
            </div>
          </div>
        )}

        {/* subscribe log */}
        <div className="col-12">
          <div className="card">
            <div className="card-header fw-bold">4. store.subscribe() log</div>
            <ul className="list-group list-group-flush">
              {log.length === 0 && <li className="list-group-item text-muted">No changes yet</li>}
              {log.map((line, i) => (
                <li key={i} className="list-group-item small">{line}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
