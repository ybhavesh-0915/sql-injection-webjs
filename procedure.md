# SQL Injection — Procedure

> ⚠️ **Safety:** run everything locally. The server binds to `127.0.0.1` and uses an in-memory dataset — do **not** expose it to a network, and never test attacks against systems you do not own or have permission for.

## 1 · Setup

```bash
git clone https://github.com/ybhavesh-0915/sql-injection-webjs.git
cd sql-injection-webjs
npm install
npm start
```

Open <http://127.0.0.1:3000> in a browser.

## 2 · Understand the Three Levels

The same `users` table (alice, bob, admin) is queried in three ways:

![The three levels of the lab](https://raw.githubusercontent.com/ybhavesh-0915/sql-injection-webjs/main/images/lab-levels.svg)

| Level | Name | How input is handled |
| --- | --- | --- |
| 1 | Vulnerable | Input is concatenated straight into SQL |
| 2 | Filtered | Input containing `' " ; -- /* */` is rejected before execution |
| 3 | Parameterized | Input is bound as a value with a placeholder (`?`) |

## 3 · Level 1 — Vulnerable

1. Enter `alice` → the row for alice is returned.
2. Enter `' OR '1'='1' --` → the SQL becomes `... WHERE username = '' OR '1'='1' --'`; **all rows** are returned.
3. Enter `admin' --` → the admin row is returned **without knowing the password**.

> 🔍 **Look closely** at the SQL echo printed by the lab — the query *structure* changed because the input was parsed as **code**.

## 4 · Level 2 — Filtered

1. Submit the same payloads.
2. Observe the *"Blocked by the demo filter"* message — the query never executes.
3. Discuss which **legitimate** inputs the filter would wrongly reject (e.g. a name like *O'Brien*).

## 5 · Level 3 — Parameterized

1. Submit the same payloads again.
2. Observe *"The value was treated only as data"* — no rows (or only an exact-username match) are returned.

## 6 · Record & Compare

Fill in your own observation table as you go:

| Payload | Level 1 result | Level 2 result | Level 3 result |
| --- | --- | --- | --- |
| `alice` | | | |
| `' OR '1'='1' --` | | | |
| `admin' --` | | | |

**Conclude:** record the SQL echoed for each level, compare the returned rows, explain the difference in *code vs data* handling, then stop the server with `Ctrl+C`.

## 7 · Troubleshooting

| Symptom | Fix |
| --- | --- |
| `EADDRINUSE` on port 3000 | Kill the old process (`Ctrl+C`) or run on another port the README mentions |
| `better-sqlite3` build error | Upgrade Node to ≥ 18 and re-run `npm install` |
| Page won't load | Confirm the server printed *Listening on 127.0.0.1:3000* |
