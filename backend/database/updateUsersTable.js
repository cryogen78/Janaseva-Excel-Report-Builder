const db = require('./database');

db.run(
  `
  ALTER TABLE users
  ADD COLUMN status TEXT DEFAULT 'active'
  `,
  (err) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log('status column added');
    }

    db.close();
  }
);