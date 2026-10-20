# Procedure

> Run everything locally. The server binds to localhost and uses an in-memory dataset — do **not** expose it to a network.

## 1. Setup

```bash
git clone https://github.com/ybhavesh-0915/sql-injection-webjs.git
cd sql-injection-webjs
npm install
npm start
```

Open <http://127.0.0.1:3000> in a browser.

## 2. Understand the three levels

| Level | Name | How input is handled |
| --- | --- | --- |
| 1 | Vulnerable | Input is concatenated straight into SQL |
| 2 | Filtered | Input containing `' " ; -- /* */` is rejected before execution |
| 3 | Parameterized | Input is bound as a value with a placeholder (`?`) |

## 3. Level 1 — Vulnerable

1. Enter `alice` → the row for alice is returned.
2. Enter `' OR '1'='1' --` → the SQL becomes `... WHERE username = '' OR '1'='1' --'`; **all rows** are returned.
3. Enter `admin' --` → the admin row is returned without knowing the password.

## 4. Level 2 — Filtered

1. Submit the same payloads.
2. Observe the *"Blocked by the demo filter"* message — the query never executes.
3. Discuss which legitimate inputs the filter would wrongly reject.

## 5. Level 3 — Parameterized

1. Submit the same payloads again.
2. Observe *"The value was treated only as data."* — no rows (or only an exact-username match) are returned.

## 6. Compare and conclude

Record the SQL shown for each level, compare the returned rows, and stop the server with `Ctrl+C`.
