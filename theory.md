# SQL Injection — Theory

![How SQL injection turns data into code](https://raw.githubusercontent.com/ybhavesh-0915/sql-injection-webjs/main/images/how-sqli-works.svg)

## 1 · What is SQL Injection?

**SQL Injection (SQLi)** is an input-validation vulnerability in which untrusted user input is interpreted as part of an **SQL statement** instead of staying plain *data* — letting the attacker change what the query does. It is one of the most severe and long-standing web vulnerabilities, tracked as [CWE-89](https://cwe.mitre.org/data/definitions/89.html) and covered by the [OWASP SQL Injection guide](https://owasp.org/www-community/attacks/SQL_Injection) and the [PortSwigger Web Security Academy](https://portswigger.net/web-security/sql-injection).

The classic entry point is a **login form**. Suppose the application builds its lookup by concatenation:

```js
const sql = `SELECT * FROM users WHERE username = '${username}'`;
```

Those single quotes are *convention*, not protection. Consider the input below being pasted into the username field:

![SQL injection data becoming code — login form example](https://raw.githubusercontent.com/ybhavesh-0915/sql-injection-webjs/main/images/sql-injection-login-bypass.png)

*Figure: the payload cracks the SQL string so `'1'='1'` is read as a **predicate** (always true) and `--` comments out the rest — the query now returns **every** user.*

The attacker changed the *logic of the program* without touching a single line of source code — only the value in a text box.

## 2 · Classification of SQL Injection

| Class | Channel | Sub-techniques |
| --- | --- | --- |
| **In-band (classic)** | Same channel carries attack & result | Error-based, UNION-based |
| **Inferential (blind)** | No data in response — infer from behaviour | Boolean-based, time-based |
| **Out-of-band** | Separate channel (DNS/HTTP callbacks) | Used when direct response is unreliable |

A fuller taxonomy of the attack surface appears in the figure below:

![Classification of SQL injection techniques](https://raw.githubusercontent.com/ybhavesh-0915/sql-injection-webjs/main/images/sqli-classification.png)

*Figure: a taxonomy of SQL-injection attack intent, injection sources and techniques — from Wikimedia Commons, [KD_SQLIA_Classification_2010](https://commons.wikimedia.org/wiki/File:KD_SQLIA_Classification_2010.png), CC BY-SA 3.0*

## 3 · Why Blacklist Filtering Fails

A filter that blocks characters like `' " ; -- /* */` only stops the *known* tricks:

- SQL offers **many encodings and alternate syntaxes**; every miss re-opens the hole.
- Character blocking breaks **legitimate input** — think of a user named *O'Brien*.
- New techniques will always exist; a *block list* must be perfect, a *safe construction* does not.

Filtering is therefore treated as **defence in depth**, never as the primary fix.

## 4 · The Correct Defence: Prepared Statements

A prepared statement separates the **query skeleton** from the **values**:

![Vulnerable concatenation vs parameterized queries](https://raw.githubusercontent.com/ybhavesh-0915/sql-injection-webjs/main/images/prepared-statement-defence.svg)

```js
const stmt = db.prepare('SELECT * FROM users WHERE username = ?');
stmt.all(username);
```

The driver transmits **structure and value separately**, so the value is parsed *only as data*. Input like `' OR '1'='1' --` becomes a harmless string that simply matches no username. Full guidance lives in the [OWASP SQL Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html); other standard layers include **least-privilege DB accounts**, **secure error handling** and **input validation by type and shape**, not by banned characters.

## 5 · In This Lab

This lab runs a local Node.js HTTP server with an in-memory SQLite table `users` (alice, bob, admin). The **same SQL** executes through three levels — **vulnerable**, **filtered**, and **parameterized** — so you can observe the difference in behaviour side by side.

## 6 · Self-Check Questions

1. What exactly does `--` do inside an SQL query, and why is it useful to an attacker?
2. In the vulnerable query, which character splits `'1'='1'` into its own predicate?
3. Give one *legitimate* login input that the Level-2 filter would wrongly reject.
4. Why does the parameterized level return **no rows** for the same payload?
