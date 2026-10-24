The lab simulates a login-style lookup against an in-memory SQLite table.

## Dataset

```sql
CREATE TABLE users (id, username, password, role);
INSERT INTO users VALUES
  (1, 'alice', 'wonderland', 'user'),
  (2, 'bob',   'builder',    'user'),
  (3, 'admin', 'sql-lab-admin', 'admin');
```

Every submission sends `POST /api/query` with `{ "username": "...", "level": "..." }` and receives the executed SQL, the returned rows, and a message.

## Run 1 — Level 1 (Vulnerable), input `alice`

- SQL executed: `SELECT id, username, password, role FROM users WHERE username = 'alice'`
- Result: 1 row (alice). ✅ expected behaviour.

## Run 2 — Level 1 (Vulnerable), input `' OR '1'='1' --`

- SQL executed: `... WHERE username = '' OR '1'='1' --'`
- Result: **all 3 rows** — the injection made the WHERE clause always true. 🚨

## Run 3 — Level 1 (Vulnerable), input `admin' --`

- SQL executed: `... WHERE username = 'admin' --'`
- Result: the **admin** row is returned with no password knowledge. 🚨

## Run 4 — Level 2 (Filtered), any payload containing quotes or `--`

- SQL executed: *(none)* — "Input rejected before query execution".
- Result: blocked. ⚠️ The filter works here, but is not a real defence (see theory).

## Run 5 — Level 3 (Parameterized), input `' OR '1'='1' --`

- SQL executed: `SELECT ... WHERE username = ?` with the payload bound as a value.
- Result: **no rows** — "The value was treated only as data." ✅

## Observation table

| Input | Level 1 rows | Level 2 | Level 3 rows |
| --- | --- | --- | --- |
| `alice` | 1 | returned | 1 |
| `' OR '1'='1' --` | 3 (all) | blocked | 0 |
| `admin' --` | 1 (admin) | blocked | 0 |
