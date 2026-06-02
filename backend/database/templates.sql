CREATE TABLE report_templates (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    template_name TEXT,

    columns_json TEXT,

    filters_json TEXT,

    created_by TEXT,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP

);