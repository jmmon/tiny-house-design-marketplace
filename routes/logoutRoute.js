const express = require('express');
const router = express.Router();

// Logout route
router.get('/', function(req, res) {
    req.logout();
    res.sendStatus(200);
});

module.exports = router;