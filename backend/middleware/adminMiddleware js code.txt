const jwt =
require("jsonwebtoken");

module.exports =
(req, res, next) => {

  const authHeader =
    req.headers.authorization;

  if (!authHeader) {

    return res.status(401)
      .json({
        message:
          "Unauthorized"
      });

  }

  const token =
    authHeader.split(" ")[1];

  try {

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET ||
        "janaseva_secret_key"
      );

    if (
      decoded.role !==
      "admin"
    ) {

      return res.status(403)
        .json({
          message:
            "Admin access only"
        });

    }

    req.user =
      decoded;

    next();

  } catch {

    return res.status(401)
      .json({
        message:
          "Invalid Token"
      });

  }

};