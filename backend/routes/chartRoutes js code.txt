const express =
require("express");

const router =
express.Router();

const controller =
require(
  "../controllers/chartController"
);

router.get(
  "/",
  controller.getCharts
);

module.exports =
router;