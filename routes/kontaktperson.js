var express = require('express');
var router = express.Router();
const db = require('../dbconn');

// Select all records from kontaktperson
router.get('/', function(req, res, next) {
	db.query('SELECT * FROM kontaktperson', function (err, results) {
        if (err) throw err;
        res.type('application/json').send(JSON.stringify({"status": 200, "action": "get@kontaktperson/", "error": null, "response": results}));
	});
});

module.exports = router;