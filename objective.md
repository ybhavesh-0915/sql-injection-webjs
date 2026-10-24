After completing this experiment, the student should be able to:

1. **Explain** how a SQL query string is assembled from untrusted user input, and where the *code/data* boundary is lost.
2. **Demonstrate** an authentication-style bypass by injecting `' OR '1'='1' --` into a concatenated query.
3. **Observe** that a character blacklist blocks simple payloads, and **discuss** why it is bypassable and over-restrictive.
4. **Show** that a parameterized query treats injected payloads as inert data.
5. **Distinguish** vulnerable, filtered, and parameterized query construction in source code.
6. **Apply** the correct mitigation — prepared statements / bound parameters — when writing database-backed applications.

## Mapping to Lab Activities

| # | Objective | Practised in |
| --- | --- | --- |
| 1–2 | Tautology payload, structure change | Level 1 · Vulnerable exercise |
| 3 | Blacklist behaviour & its blind spots | Level 2 · Filtered exercise |
| 4–6 | Safe construction with `?` placeholders | Level 3 · Parameterized exercise (+ [Theory §4](https://github.com/ybhavesh-0915/sql-injection-webjs/blob/main/theory.md#4--the-correct-defence-prepared-statements)) |

> 🎯 **Success criterion:** at the end, you should be able to say *why* the same payload returns all rows, is blocked, and is inert — in the three levels respectively.
