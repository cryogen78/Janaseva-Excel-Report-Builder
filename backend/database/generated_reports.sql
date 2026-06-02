CREATE TABLE generated_reports (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    report_name TEXT,

    generated_by TEXT,

    report_type TEXT,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP

);