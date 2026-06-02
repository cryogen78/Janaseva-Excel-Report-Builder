const db = require('../database/database');

/*
|--------------------------------------------------------------------------
| SAVE TEMPLATE
|--------------------------------------------------------------------------
*/

exports.saveTemplate = (req, res) => {

  const {
    templateName,
    columns,
    filters,
    createdBy
  } = req.body;

  db.run(

    `
    INSERT INTO report_templates
    (
      template_name,
      columns_json,
      filters_json,
      created_by
    )
    VALUES
    (?, ?, ?, ?)
    `,

    [
      templateName,
      JSON.stringify(columns),
      JSON.stringify(filters),
      createdBy
    ],

    function(err) {

      if (err) {

        return res.status(500).json({
          success: false,
          error: err.message
        });

      }

      res.json({
        success: true,
        id: this.lastID
      });

    }

  );

};

/*
|--------------------------------------------------------------------------
| GET ALL TEMPLATES
|--------------------------------------------------------------------------
*/

exports.getTemplates = (req, res) => {

  db.all(

    `
    SELECT *
    FROM report_templates
    ORDER BY created_at DESC
    `,

    [],

    (err, rows) => {

      if (err) {

        return res.status(500).json({
          success: false,
          error: err.message
        });

      }

      res.json(rows);

    }

  );

};

/*
|--------------------------------------------------------------------------
| DELETE TEMPLATE
|--------------------------------------------------------------------------
*/

exports.deleteTemplate = (req, res) => {

  const { id } = req.params;

  db.run(

    `
    DELETE FROM report_templates
    WHERE id = ?
    `,

    [id],

    function(err) {

      if (err) {

        return res.status(500).json({
          success: false,
          error: err.message
        });

      }

      res.json({
        success: true,
        deletedRows: this.changes
      });

    }

  );

};