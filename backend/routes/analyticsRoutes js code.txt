const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {

  res.json({
    success: true,
    analytics: {
      totalReports: 0,
      totalUploads: 0,
      totalTemplates: 0
    }
  });

});

module.exports = router;