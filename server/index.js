import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 4000;
const SECRET_KEY = 'your_secret_key';

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      status TEXT,
      type TEXT,
      clientName TEXT,
      amount REAL
    )
  `);

  const hashedPasswordAdmin = bcrypt.hashSync('Admin', 10);

  db.run(`
    INSERT OR IGNORE INTO users (username, password) VALUES ('admin', '${hashedPasswordAdmin}')
  `);
});

app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.get(`SELECT * FROM users WHERE LOWER(username) = LOWER(?)`, [username], async (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (!row) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, row.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: row.id, username: row.username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  });
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  
  db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashedPassword], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Failed to register user' });
    }
    
    res.json({ message: 'User registered successfully' });
  });
});

app.get('/transactions', authenticateToken, (req, res) => {
  db.all('SELECT * FROM transactions', [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

app.post('/transactions', authenticateToken, (req, res) => {
  const { status, type, clientName, amount } = req.body;
  db.run(
    'INSERT INTO transactions (status, type, clientName, amount) VALUES (?, ?, ?, ?)',
    [status, type, clientName, amount],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

app.delete('/transactions/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM transactions WHERE id = ?', [id], function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ deletedID: id });
  });
});

app.put('/transactions/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  db.run(
    'UPDATE transactions SET status = ? WHERE id = ?',
    [status, id],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ updatedID: this.changes });
    }
  );
});

app.post('/transactions/import', authenticateToken, (req, res) => {
  const transactions = req.body;
  const stmt = db.prepare(
    'INSERT INTO transactions (status, type, clientName, amount) VALUES (?, ?, ?, ?)'
  );
  transactions.forEach((transaction) => {
    stmt.run(transaction.Status, transaction.Type, transaction.ClientName, transaction.Amount);
  });
  stmt.finalize();
  res.json({ message: 'Transactions imported' });
});

app.get('/transactions/export', authenticateToken, (req, res) => {
  const { filterParam } = req.query;
  let query = 'SELECT * FROM transactions';
  const conditions = [];

  if (filterParam) {
    conditions.push(`type = '${filterParam}'`);
  }

  if (conditions.length) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    const headers = ['id', 'status', 'type', 'clientName', 'amount'];
    const csvRows = [headers.join(',')];
    rows.forEach((row) => {
      csvRows.push(Object.values(row).join(','));
    });
    res.header('Content-Type', 'text/csv');
    res.attachment('transactions.csv');
    res.send(csvRows.join('\n'));
  });
});

app.listen(PORT, () => {
  console.log(`Application listening on port ${PORT}!`);
})