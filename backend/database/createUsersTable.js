const db = require('./database');

db.serialize(() => {

  db.run(`
    CREATE TABLE IF NOT EXISTS users (

      id INTEGER PRIMARY KEY AUTOINCREMENT,

      username TEXT UNIQUE NOT NULL,

      password TEXT NOT NULL,

      role TEXT DEFAULT 'user',

      status TEXT DEFAULT 'active',

      created_at DATETIME DEFAULT CURRENT_TIMESTAMP

    )
  `);

  console.log('Users table created');

});

db.close();