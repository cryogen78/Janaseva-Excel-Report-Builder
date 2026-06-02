const express =
require("express");

const router =
express.Router();

const controller =
require(
  "../controllers/branchController"
);

router.get(
  "/",
  controller.getBranchAnalytics
);

module.exports =
router;