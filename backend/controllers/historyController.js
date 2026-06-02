const db =
require("../database/database");

exports.getHistory =
(req, res) => {

  db.all(
    `
    SELECT *
    FROM report_history
    ORDER BY id DESC
    `,
    [],
    (err, rows) => {

      if (err) {

        return res
          .status(500)
          .json({
            message:
              err.message
          });

      }

      res.json(rows);

    }
  );

};