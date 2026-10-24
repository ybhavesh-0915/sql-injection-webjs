# SQL Injection — Aim & Overview

> 📌 **Experiment:** Understanding, Detecting and Preventing SQL Injection
> **Source code:** [sql-injection-webjs on GitHub](https://github.com/ybhavesh-0915/sql-injection-webjs)

## Aim

To demonstrate how **SQL Injection (SQLi)** allows an attacker to change the *structure* of a database query through untrusted input, and to compare three ways of handling that input — **string concatenation** (vulnerable), a **character blacklist** (naive filter), and **parameterized queries** (correct fix) — on the *same* application and *same* dataset.

## At a Glance

| Field | Detail |
| --- | --- |
| **Category** | Web Security |
| **Attack class** | Injection — [OWASP Top 10](https://owasp.org/www-project-top-ten/) · [CWE-89](https://cwe.mitre.org/data/definitions/89.html) |
| **Difficulty** | Beginner |
| **Estimated time** | 20–30 minutes |
| **Platform** | Node.js HTTP server → in-memory SQLite (`users`) |
| **Prerequisites** | Basic SQL (`SELECT`, `WHERE`), JavaScript template strings |

## Toolchain

- **Runtime** — Node.js ≥ 18 · [download](https://nodejs.org/en/download)
- **Database driver** — better-sqlite3, whose [prepared statements](https://github.com/WiseLibs/better-sqlite3) power Level 3
- **Client** — any modern browser for the lab pages at `http://127.0.0.1:3000`

## What You Will Achieve

By the end of this experiment you will be able to:

1. Reproduce an **authentication bypass** using a classic *tautology* payload.
2. Explain **why** the payload works — and why a character **blacklist** does not stop it.
3. Prove that a **parameterized query** renders the very same payload inert.

> ⚠️ **Ethics notice** — every exercise here runs *locally* against code you cloned yourself. Never test injection on systems you do not have explicit, written permission to test. See the [project home](https://github.com/ybhavesh-0915/cyber-lab).
