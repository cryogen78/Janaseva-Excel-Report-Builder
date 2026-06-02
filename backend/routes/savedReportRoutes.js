const express =
require("express");

const router =
express.Router();

const controller =
require(
  "../controllers/savedReportController"
);

router.post(
  "/save",
  controller.saveReport
);

router.get(
  "/",
  controller.getReports
);

module.exports =
router;