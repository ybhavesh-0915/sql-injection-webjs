# Assignment

## Tasks

1. Run the lab at all three levels and fill the observation table from `simulation.md` in your record.
2. Craft **one additional** payload of your own (not used in the simulation) that changes the result of Level 1, and explain the resulting SQL.
3. Modify `server.js` to log every executed SQL statement, and attach the log for the three levels.
4. Add a fourth level `escaped` that escapes quotes by doubling them (`''`) and test whether `admin' --` still works. Document the result.
5. Change one payload that **bypasses** the Level 2 blacklist (hint: SQL has more than one comment syntax) and record what happened.

## Review questions

1. Define SQL injection. Why is it classified as an injection attack (CWE-89)?
2. Why does concatenating user input into SQL change the *logic* of the query?
3. Give two reasons a character blacklist is not a complete defence.
4. How does a prepared statement stop input from becoming code?
5. What is the difference between error-based, boolean-blind, and time-based SQLi?
6. List four defences a production application should combine.

## Submission

- A PDF/DOC with: aim, theory summary, screenshots of each level, observation table, answers to review questions, and the modified code for Tasks 4/5.
