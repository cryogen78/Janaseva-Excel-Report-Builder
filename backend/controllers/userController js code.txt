const db = require("../database/database");
const bcrypt = require("bcryptjs");

const getUsers = (req, res) => {

  db.all(
    `
    SELECT
      id,
      username,
      role,
      status,
      created_at
    FROM users
    ORDER BY id DESC
    `,
    [],
    (err, rows) => {

      if (err) {

        return res.status(500).json({
          success: false,
          message: err.message
        });

      }

      res.json({
        success: true,
        users: rows
      });

    }
  );

};

const createUser = async (req, res) => {

  try {

    const {
      username,
      password,
      role
    } = req.body;

    if (!username || !password) {

      return res.status(400).json({
        success: false,
        message: "Username and Password required"
      });

    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    db.run(
      `
      INSERT INTO users
      (
        username,
        password,
        role,
        status
      )
      VALUES (?, ?, ?, 'active')
      `,
      [
        username,
        hashedPassword,
        role || "user"
      ],
      function (err) {

        if (err) {

          return res.status(500).json({
            success: false,
            message: err.message
          });

        }

        res.status(201).json({

          success: true,

          message: "User Created",

          id: this.lastID

        });

      }
    );

  }
  catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

const deleteUser = (req, res) => {

  db.run(
    `
    DELETE FROM users
    WHERE id = ?
    `,
    [req.params.id],
    function (err) {

      if (err) {

        return res.status(500).json({
          success: false,
          message: err.message
        });

      }

      res.json({

        success: true,

        message: "User Deleted"

      });

    }
  );

};

const disableUser = (req, res) => {

  db.run(
    `
    UPDATE users
    SET status='disabled'
    WHERE id=?
    `,
    [req.params.id],
    function (err) {

      if (err) {

        return res.status(500).json({
          success: false,
          message: err.message
        });

      }

      res.json({

        success: true,

        message: "User Disabled"

      });

    }
  );

};

const enableUser = (req, res) => {

  db.run(
    `
    UPDATE users
    SET status='active'
    WHERE id=?
    `,
    [req.params.id],
    function (err) {

      if (err) {

        return res.status(500).json({
          success: false,
          message: err.message
        });

      }

      res.json({

        success: true,

        message: "User Enabled"

      });

    }
  );

};

const resetPassword = async (req, res) => {

  try {

    const { password } = req.body;

    const hashedPassword =
      await bcrypt.hash(password, 10);

    db.run(
      `
      UPDATE users
      SET password = ?
      WHERE id = ?
      `,
      [
        hashedPassword,
        req.params.id
      ],
      function (err) {

        if (err) {

          return res.status(500).json({
            success: false,
            message: err.message
          });

        }

        res.json({

          success: true,

          message: "Password Updated"

        });

      }
    );

  }
  catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

module.exports = {
  getUsers,
  createUser,
  deleteUser,
  disableUser,
  enableUser,
  resetPassword
};