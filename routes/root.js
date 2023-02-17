const react = require("react");
const ReactDOM = require("react-dom");
const express = require("express");
const router = express.Router();
const path = require("path");

router.get("^/$|/main(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "main.html"));
});

module.exports = router;
