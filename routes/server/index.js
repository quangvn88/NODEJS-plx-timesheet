const express = require("express");
const router = express.Router({ mergeParams: true });
const controller = require("../../controller/server");

router.post("/create-ts", controller.create_ts);

module.exports = router;