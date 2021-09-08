const express = require("express");
const router = express.Router();
const auth = require("../auth");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.post("/get", auth.get);
router.post("/update", auth.update);
router.post("/create", auth.create);

module.exports = router;
