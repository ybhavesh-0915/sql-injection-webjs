# SQL Injection (SQLi)

## 1. Introduction

SQL Injection (SQLi) is a web security vulnerability that occurs when an application includes untrusted user input directly in an SQL query. An attacker may manipulate the query to bypass authentication, access unauthorized data, or modify database records.

## 2. Objectives

- Understand how SQL Injection works.
- Identify vulnerable SQL queries.
- Learn common SQL Injection techniques.
- Understand how to prevent SQL Injection.
- Practice detection in an authorized lab environment.

## 3. How SQL Injection Works

SQL Injection occurs when user input is treated as part of an SQL command instead of ordinary data.

For example, consider this vulnerable PHP query:

```php
$username = $_POST['username'];
$password = $_POST['password'];

$query = "SELECT * FROM users
          WHERE username = '$username'
          AND password = '$password'";
```

Because the input is directly concatenated into the query, specially crafted input can change the query's intended logic.

## 4. Types of SQL Injection

### 4.1 In-band SQL Injection

The attacker uses the same communication channel to submit malicious input and observe the results.

Common forms:
- **Error-based SQLi:** Uses database error messages to identify vulnerabilities.
- **UNION-based SQLi:** Attempts to combine results from multiple SQL queries.

### 4.2 Blind SQL Injection

The application does not directly display database results, so the attacker infers information from its behavior.

Common forms:
- **Boolean-based SQLi:** Observes differences in responses to true and false conditions.
- **Time-based SQLi:** Observes response delays caused by database expressions.

### 4.3 Out-of-band SQL Injection

This technique uses a separate communication channel to retrieve information when the normal response channel is unsuitable.

## 5. Example of a Vulnerable Query

Consider the following SQL query:

```sql
SELECT * FROM users
WHERE username = 'admin'
AND password = 'user_input';
```

If an application inserts user input directly into this query, an attacker may manipulate its conditions and potentially bypass authentication.

**Root cause:** Untrusted input is concatenated into SQL instead of being handled as a parameter.

## 6. Impact of SQL Injection

- Unauthorized access to application data.
- Authentication bypass.
- Exposure of confidential information.
- Unauthorized modification or deletion of records.
- Potential compromise of database integrity and availability.

The actual impact depends on database permissions, application design, and the vulnerability's severity.

## 7. Prevention Techniques

### 7.1 Use Parameterized Queries

Use prepared statements to keep SQL commands separate from user-supplied values.

Example using Node.js and MySQL:

```javascript
const query = `
  SELECT * FROM users
  WHERE username = ?
  AND password_hash = ?
`;

const [rows] = await connection.execute(query, [
  username,
  passwordHash
]);
```

### 7.2 Input Validation

Validate user input according to its expected type, format, length, and permitted values.

### 7.3 Least Privilege

Give database accounts only the permissions required for their specific tasks.

### 7.4 Avoid Detailed Database Errors

Do not expose raw SQL errors or database stack traces to users. Log technical details securely on the server.

### 7.5 Secure Authentication

Store passwords using an appropriate password-hashing algorithm, such as Argon2id or bcrypt. Never store plaintext passwords.

## 8. Detection and Testing

- Review application code for dynamically constructed SQL queries.
- Test input handling in an isolated, authorized environment.
- Inspect application and database logs for unexpected query errors.
- Use security testing tools against systems for which testing permission has been granted.
- Verify that parameterized queries prevent user input from changing SQL query structure.

## 9. Practical Lab

**Scenario:** A login form retrieves user records using an SQL query.

**Tasks:**

1. Set up a local test application and database.
2. Review the login query and identify unsafe string concatenation.
3. Test how the application handles unexpected input.
4. Replace the vulnerable query with a parameterized query.
5. Repeat the tests and verify that the query structure remains unchanged.
6. Document the vulnerability, impact, and remediation.

**Safety note:** Perform these exercises only on your own application or an explicitly authorized lab.

## 10. Conclusion

SQL Injection is a serious web application vulnerability caused by unsafe SQL query construction. Parameterized queries, proper input validation, least-privilege database accounts, and secure error handling significantly reduce the risk of exploitation.

## 11. References

- [OWASP SQL Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)
- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [PortSwigger Web Security Academy — SQL Injection](https://portswigger.net/web-security/sql-injection)
- [CWE-89: Improper Neutralization of Special Elements Used in an SQL Command](https://cwe.mitre.org/data/definitions/89.html)
