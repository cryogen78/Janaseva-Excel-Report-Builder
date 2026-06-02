const db =
require("./database");

db.run(
  `
  CREATE TABLE IF NOT EXISTS report_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    report_name TEXT,
    generated_by TEXT,
    file_name TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
  `,
  (err) => {

    if (err) {
      console.log(err);
    } else {
      console.log(
        "report_history table ready"
      );
    }

    process.exit();

  }
);