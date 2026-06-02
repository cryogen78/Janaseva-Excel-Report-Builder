const db =
require("../database/database");

exports.getDashboardStats =
(req, res) => {

  const stats = {};

  db.get(
    `
    SELECT COUNT(*) AS count
    FROM users
    `,
    [],
    (err, users) => {

      stats.users =
        users?.count || 0;

      db.get(
        `
        SELECT COUNT(*) AS count
        FROM uploads
        `,
        [],
        (err2, uploads) => {

          stats.uploads =
            uploads?.count || 0;

          db.get(
            `
            SELECT COUNT(*) AS count
            FROM templates
            `,
            [],
            (
              err3,
              templates
            ) => {

              stats.templates =
                templates?.count || 0;

              db.get(
                `
                SELECT COUNT(*) AS count
                FROM report_history
                `,
                [],
                (
                  err4,
                  reports
                ) => {

                  stats.reports =
                    reports?.count || 0;

                  res.json(
                    stats
                  );

                }
              );

            }
          );

        }
      );

    }
  );

};