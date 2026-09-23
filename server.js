const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const Database = require('better-sqlite3');

const HOST = process.env.HOST || '0.0.0.0';
const PORT = Number(process.env.PORT) || 3000;
const publicDir = path.join(__dirname, 'public');
const database = new Database(path.join(__dirname, 'sql-injection-lab.db'));

database.exec(`
  DROP TABLE IF EXISTS users;
  CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL
  );
  INSERT INTO users (username, password, role) VALUES
    ('alice', 'wonderland', 'user'),
    ('bob', 'builder', 'user'),
    ('admin', 'sql-lab-admin', 'admin');
`);

const users = database.prepare('SELECT id, username, password, role FROM users');
const safeUser = database.prepare(
  'SELECT id, username, password, role FROM users WHERE username = ?'
);

const levels = {
  vulnerable: {
    label: 'Level 1 · Vulnerable',
    description: 'Raw string concatenation. Input becomes part of the SQL statement.',
    color: 'red'
  },
  filtered: {
    label: 'Level 2 · Filtered',
    description: 'Common SQL metacharacters are blocked. This is not a complete defense.',
    color: 'amber'
  },
  secure: {
    label: 'Level 3 · Parameterized',
    description: 'Prepared statements keep input as data, never executable SQL.',
    color: 'green'
  }
};

function executeQuery(username, level) {
  if (!levels[level]) level = 'vulnerable';

  if (level === 'filtered' && /['";]|--|\/\*|\*\//.test(username)) {
    return {
      level,
      blocked: true,
      sql: 'Input rejected before query execution',
      rows: [],
      message: 'Blocked by the demo filter. Filters can be bypassed in real systems, so use parameterized queries.'
    };
  }

  if (level === 'secure') {
    const rows = safeUser.all(username);
    return {
      level,
      blocked: false,
      sql: 'SELECT ... WHERE username = ?',
      rows,
      message: rows.length ? 'The value was treated only as data.' : 'No matching user. The value was treated only as data.'
    };
  }

  const sql = `SELECT id, username, password, role FROM users WHERE username = '${username}'`;
  try {
    const rows = database.prepare(sql).all();
    return {
      level,
      blocked: false,
      sql,
      rows,
      message: rows.length ? 'The raw SQL returned rows.' : 'The raw SQL returned no rows.'
    };
  } catch (error) {
    return {
      level,
      blocked: false,
      sql,
      rows: [],
      message: `SQL error: ${error.message}`
    };
  }
}

function sendJson(response, status, payload) {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store'
  });
  response.end(JSON.stringify(payload));
}

function serveStatic(request, response) {
  const requested = request.url === '/' ? '/index.html' : request.url;
  const filePath = path.normalize(path.join(publicDir, requested));
  if (!filePath.startsWith(publicDir)) return sendJson(response, 403, { error: 'Forbidden' });

  fs.readFile(filePath, (error, content) => {
    if (error) return sendJson(response, 404, { error: 'Not found' });
    const extension = path.extname(filePath);
    const contentTypes = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8' };
    response.writeHead(200, { 'Content-Type': contentTypes[extension] || 'application/octet-stream' });
    response.end(content);
  });
}

const server = http.createServer((request, response) => {
  if (request.method === 'POST' && request.url === '/api/query') {
    let body = '';
    request.on('data', chunk => {
      body += chunk;
      if (body.length > 10_000) request.destroy();
    });
    request.on('end', () => {
      try {
        const input = JSON.parse(body);
        const username = typeof input.username === 'string' ? input.username : '';
        const level = typeof input.level === 'string' ? input.level : 'vulnerable';
        sendJson(response, 200, { ...executeQuery(username, level), levels });
      } catch {
        sendJson(response, 400, { error: 'Expected JSON with username and level.' });
      }
    });
    return;
  }

  if (request.method === 'GET') return serveStatic(request, response);
  sendJson(response, 405, { error: 'Method not allowed' });
});

server.listen(PORT, HOST, () => {
  console.log(`SQL Injection Lab running at http://${HOST}:${PORT}`);
  console.log('Local-only demo. Do not expose this server to a network.');
});

function closeDatabase() {
  database.close();
}
process.on('SIGINT', () => { closeDatabase(); process.exit(0); });
process.on('SIGTERM', () => { closeDatabase(); process.exit(0); });
