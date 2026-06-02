const db =
require("../database/database");

function logAction(
  username,
  action
){

  db.run(
    `
    INSERT INTO audit_logs
    (
      username,
      action
    )
    VALUES
    (?,?)
    `,
    [
      username,
      action
    ]
  );

}

module.exports =
logAction;