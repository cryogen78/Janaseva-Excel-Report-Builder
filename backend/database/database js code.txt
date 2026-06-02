const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/janaseva.db', (err) => {

  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to SQLite Database');
  }

});

module.exports = db;