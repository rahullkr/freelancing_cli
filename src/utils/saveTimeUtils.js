const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const dirPath = path.resolve(__dirname, "../dir/startTime.db");

const db = new sqlite3.Database(dirPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS startTime (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      project_name TEXT,
      start_time TEXT,
      stop_time TEXT
    )
  `);
});

// Save your time entries in start_time.db
function saveTimeEntry(project, startTime) {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO startTime (project_name, start_time) VALUES (?, ?)",
      [project, startTime],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      }
    );
  });
}

// Function to get all data from your database
function showTimeEntries() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM startTime", [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

// Function to stop query
function stopTimeEntry(project, stopTime) {
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE startTime SET stop_time = ? WHERE project_name = ? AND stop_time IS NULL",
      [stopTime, project],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      }
    );
  });
}

// Function to report your projects
function getTimeEntries(project, sinceDate) {
  return new Promise((resolve, reject) => {
    const query = sinceDate
      ? 'SELECT * FROM startTime WHERE project_name = ? AND start_time >= ?'
      : 'SELECT * FROM startTime WHERE project_name = ?';
    const params = sinceDate ? [project, sinceDate.toISOString()] : [project];
    db.all(query, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

module.exports = { saveTimeEntry, showTimeEntries, stopTimeEntry, getTimeEntries};
