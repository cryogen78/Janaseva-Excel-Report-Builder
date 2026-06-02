CREATE TABLE audit_logs (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    username TEXT,

    action TEXT,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP

);