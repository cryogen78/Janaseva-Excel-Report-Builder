CREATE TABLE uploaded_files (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    file_name TEXT,

    uploaded_by TEXT,

    rows_count INTEGER,

    uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP

);