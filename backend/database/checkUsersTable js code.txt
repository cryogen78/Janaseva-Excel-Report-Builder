const db = require('./database');

db.all(
  "PRAGMA table_info(users)",
  [],
  (err, rows) => {

    if (err) {
      console.log(err);
      return;
    }

    console.table(rows);

    db.close();

  }
);