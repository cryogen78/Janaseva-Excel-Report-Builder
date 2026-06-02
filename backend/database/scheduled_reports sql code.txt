CREATE TABLE scheduled_reports (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    report_name TEXT,

    schedule_type TEXT,

    next_run DATETIME,

    status TEXT

);