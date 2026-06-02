const db =
require("./database");

db.run(
  `
  ALTER TABLE users
  ADD COLUMN role TEXT DEFAULT 'user'
  `,
  (err) => {

    if (
      err &&
      !err.message.includes(
        "duplicate column"
      )
    ) {

      console.log(err);

    } else {

      console.log(
        "Role column ready"
      );

    }

    process.exit();

  }
);