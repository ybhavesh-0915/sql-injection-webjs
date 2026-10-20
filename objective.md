# Objective

After completing this experiment, the student should be able to:

1. Explain how a SQL query string is assembled from untrusted user input.
2. Demonstrate an authentication-style bypass by injecting `' OR '1'='1' --` into a concatenated query.
3. Observe that a character blacklist blocks simple payloads and discuss why it is bypassable.
4. Show that a parameterized query treats injected payloads as inert data.
5. Distinguish vulnerable, filtered, and parameterized query construction in source code.
6. Apply the correct mitigation (prepared statements / bound parameters) when writing database-backed applications.
