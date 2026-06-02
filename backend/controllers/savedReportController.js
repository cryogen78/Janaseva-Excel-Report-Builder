const db =
require("../database/database");

exports.saveReport =
(req,res)=>{

  const {
    reportName,
    config,
    user
  } = req.body;

  db.run(
    `
    INSERT INTO saved_reports
    (
      report_name,
      report_config,
      created_by
    )
    VALUES
    (?,?,?)
    `,
    [
      reportName,
      JSON.stringify(config),
      user
    ],
    function(err){

      if(err){

        return res
        .status(500)
        .json(err);

      }

      res.json({
        success:true
      });

    }
  );

};

exports.getReports =
(req,res)=>{

  db.all(
    `
    SELECT *
    FROM saved_reports
    ORDER BY id DESC
    `,
    [],
    (err,rows)=>{

      if(err){

        return res
        .status(500)
        .json(err);

      }

      res.json(rows);

    }
  );

};