// Small Express API that issues and checks JSON Web Tokens (JWT)
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// allow the React app (port 3000) to call this API
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

const PORT = 5050;
const JWT_SECRET = process.env.JWT_SECRET || 'comp3123-lab10-secret';

// demo user (no database for this lab)
const users = [
  { id: 1, username: 'sami', password: 'password123', name: 'Sami Al-Sadi', role: 'student' },
];

// POST /api/login -> returns a signed token
app.post('/api/login', (req, res) => {
  const { username, password } = req.body || {};
  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const payload = { id: user.id, username: user.username, name: user.name, role: user.role };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
});

// middleware: check the "Authorization: Bearer <token>" header
function verifyToken(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
}

// GET /api/profile -> only works with a valid token
app.get('/api/profile', verifyToken, (req, res) => {
  res.json({ message: 'You accessed a protected route', user: req.user });
});

app.listen(PORT, () => {
  console.log(`JWT server running on http://localhost:${PORT}`);
});
