const db = require('./database');
const bcrypt = require('bcryptjs');

async function createAdmin() {

  const password =
    await bcrypt.hash(
      'admin123',
      10
    );

  db.run(
    `
    INSERT OR IGNORE INTO users
    (
      username,
      password,
      role,
      status
    )
    VALUES
    (
      'admin',
      ?,
      'admin',
      'active'
    )
    `,
    [password],
    (err) => {

      if (err) {

        console.log(err);

      } else {

        console.log(
          'Admin created'
        );

      }

      db.close();

    }
  );

}

createAdmin();