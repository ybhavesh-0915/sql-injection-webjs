# Theory

## What is SQL Injection?

SQL Injection (SQLi) is an input-validation attack in which untrusted data supplied by a user is interpreted as part of a SQL statement. Instead of remaining *data*, the input becomes *code* — changing the meaning of the query. It is one of the most severe and long-standing web application vulnerabilities (OWASP Top 10, CWE-89).

## How the vulnerability arises

A vulnerable application builds SQL by concatenation:

```js
const sql = `SELECT * FROM users WHERE username = '${username}'`;
```

The single quotes around `username` are only convention. If the user supplies

```
' OR '1'='1' --
```

the statement becomes:

```sql
SELECT * FROM users WHERE username = '' OR '1'='1' --'
```

The predicate `'1'='1'` is always true and `--` comments out the rest, so the query returns **every** row instead of one user. The attacker changed the *logic* of the program without touching a line of source code.

## Classification of SQL Injection

| Type | Description |
| --- | --- |
| **In-band (classic)** | Result or error comes back on the same channel — error-based, UNION-based. |
| **Inferential (blind)** | No data in the response; attacker infers from behaviour — boolean-based, time-based. |
| **Out-of-band** | Data exfiltrated via a separate channel (DNS/HTTP callbacks). |

## Why blacklist filtering fails

A filter that blocks characters such as `' " ; -- /* */` only stops the *known* tricks:

- SQL is a rich language — many encodings and alternate syntaxes exist.
- Filters must be exhaustive; a single miss re-opens the hole.
- Character-level blocking breaks legitimate input (e.g. O'Brien, comments containing quotes).

Filtering is therefore treated as **defence in depth**, never the primary fix.

## Prepared statements (the correct defence)

A prepared statement separates the *query skeleton* from the *values*:

```js
const stmt = db.prepare('SELECT * FROM users WHERE username = ?');
stmt.all(username);
```

The driver transmits the structure and the value separately, so the value is parsed **only as data**. Even input like `' OR '1'='1' --` simply matches no username. Other standard mitigations: least-privilege DB accounts, escaping as a last resort, and validating input by *type and shape* rather than by denying characters.

## Lab context

This lab runs a local Node.js HTTP server with an in-memory SQLite table `users` (alice / bob / admin). The same SQL is executed through three levels — vulnerable, filtered, and parameterized — so the difference in behaviour can be observed directly.
