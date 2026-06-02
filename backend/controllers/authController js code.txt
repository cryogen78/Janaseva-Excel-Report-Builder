const db = require('../database/database.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = (req, res) => {

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: 'Username and password are required'
    });
  }

  db.get(
    `
    SELECT *
    FROM users
    WHERE username = ?
    AND status = 'active'
    `,
    [username],
    async (err, user) => {

      if (err) {
        console.error(err);

        return res.status(500).json({
          message: 'Database error'
        });
      }

      if (!user) {
        return res.status(401).json({
          message: 'Invalid credentials'
        });
      }

      const passwordMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!passwordMatch) {
        return res.status(401).json({
          message: 'Invalid credentials'
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          role: user.role
        },
        process.env.JWT_SECRET || 'janaseva_secret_key',
        {
          expiresIn: '8h'
        }
      );

      res.status(200).json({

        message: 'Login successful',

        token,

        user: {
          id: user.id,
          username: user.username,
          role: user.role
        }

      });

    }
  );

};

module.exports = {
  login
};