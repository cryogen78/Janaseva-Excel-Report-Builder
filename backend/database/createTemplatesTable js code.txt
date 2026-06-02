const db = require('./database.js');

db.run(`
CREATE TABLE IF NOT EXISTS report_templates (

  id INTEGER PRIMARY KEY AUTOINCREMENT,

  template_name TEXT NOT NULL,

  columns_json TEXT,

  filters_json TEXT,

  created_by TEXT,

  created_at DATETIME DEFAULT CURRENT_TIMESTAMP

)
`, (err) => {

  if (err) {
    console.error(err);
  } else {
    console.log('Templates table created successfully');
  }

  db.close();

});