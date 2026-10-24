## Standards & Guidance

1. **OWASP** — [SQL Injection community guide](https://owasp.org/www-community/attacks/SQL_Injection) · overview, attack forms, impact.
2. **OWASP Cheat Sheet Series** — [SQL Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html) · the canonical defence checklist.
3. **OWASP Cheat Sheet Series** — [Query Parameterization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Query_Parameterization_Cheat_Sheet.html) · correct prepared-statement syntax per language/driver.
4. **PortSwigger Web Security Academy** — [SQL Injection](https://portswigger.net/web-security/sql-injection) · free hands-on labs (covers UNION-based and blind injection as separate units).
5. **MITRE** — [CWE-89](https://cwe.mitre.org/data/definitions/89.html) — *Improper Neutralization of Special Elements used in an SQL Command*.
6. **SQLite Documentation** — [sqlite.org/docs](https://www.sqlite.org/docs.html) — the engine used in this lab.
7. **better-sqlite3** — [GitHub » WiseLibs/better-sqlite3](https://github.com/WiseLibs/better-sqlite3) — driver whose [prepared statements](https://github.com/WiseLibs/better-sqlite3#prepare) power Level 3.
8. **Node.js** — [http module](https://nodejs.org/api/http.html) — server used by the lab.

## Image Attribution

| Asset | Source & License |
| --- | --- |
| `images/sql-injection-login-bypass.png` | ["SQL injection"](https://commons.wikimedia.org/wiki/File:SQL_injection.png) via **Wikimedia Commons** — © Batka savemazaalai, **CC BY-SA 4.0** |
| `images/sqli-classification.png` | ["KD SQLIA Classification 2010"](https://commons.wikimedia.org/wiki/File:KD_SQLIA_Classification_2010.png) via **Wikimedia Commons** — © KDeltchev, **CC BY-SA 3.0** |
| `images/how-sqli-works.svg` | Authored for this project — same license as the repo |
| `images/prepared-statement-defence.svg` | Authored for this project — same license as the repo |
| `images/lab-levels.svg` | Authored for this project — same license as the repo |

## Further Reading

- 🔐 [OWASP Cheat Sheet Series, home](https://cheatsheetseries.owasp.org/) — sibling sheets: authentication, session management, validation.
- 🧪 [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/) — the *Testing for SQL Injection* chapter ([WSTG-INPV-05](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/07-Input_Validation_Testing/05-Testing_for_SQL_Injection)).

> 💡 If you find a broken link, please [open an issue](https://github.com/ybhavesh-0915/cyber-lab/issues) — fixed links keep student references trustworthy.
