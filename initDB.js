import { DatabaseSync } from 'node:sqlite';
const database = new DatabaseSync('./appDB');

// Execute SQL statements from strings.
database.exec(`
  DROP TABLE IF EXISTS data
`);

database.exec(`
  CREATE TABLE data(
    note_id INTEGER PRIMARY KEY,
    note_txt TEXT
  ) STRICT
`);
// Create a prepared statement to insert data into the database.
const insert = database.prepare('INSERT INTO data (note_txt) VALUES (?)');
insert.run('hello');