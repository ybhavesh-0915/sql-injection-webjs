# SQL Injection Lab

A local Node.js learning lab that compares three ways to handle a username in a SQLite query:

- **Vulnerable:** raw string concatenation, intentionally unsafe for the local demo.
- **Filtered:** blocks a few common characters, illustrating why blacklist filtering is incomplete.
- **Parameterized:** uses a prepared statement so input remains data.

## Run

```bash
npm install
npm start
```

Open <http://127.0.0.1:3000>. The server binds to localhost and uses an in-memory dataset; it does not connect to any external database. Stop it with `Ctrl+C`.

Use only the included demo inputs or systems you own/have permission to test. Do not expose this intentionally vulnerable server to a network.
