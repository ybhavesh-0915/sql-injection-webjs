# Aim

To study and demonstrate the **SQL Injection (SQLi)** vulnerability in a controlled, local Node.js + SQLite web lab, and to compare three ways of handling untrusted input in a SQL query:

1. **Vulnerable** — raw string concatenation, where user input becomes part of the SQL statement.
2. **Filtered** — a blacklist that blocks a few common SQL metacharacters.
3. **Parameterized** — prepared statements, where input is bound as data and can never change query logic.

The experiment shows how attacker-controlled input can alter the logic of a query, why blacklist filtering is an incomplete defence, and why prepared statements are the recommended mitigation.
