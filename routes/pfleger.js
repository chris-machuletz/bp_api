var express = require('express');
var router = express.Router();
const db = require('../dbconn');

// Select all records from pfleger
router.get('/', function(req, res, next) {
	db.query('SELECT * FROM pfleger', function (err, results) {
        if (err) throw err;
        res.type('application/json').send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
});

// Select a single record from pfleger
router.get('/:id', function(req, res, next) {
	db.query(`SELECT * FROM pfleger WHERE pfleger_id = ${req.params.id}`, function (err, results) {
		if (err) throw err;
		res.type('application/json').send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
});

// Select single pfleger record by 'Personalnummer'
router.get('/pn/:id', function(req, res, next) {
	db.query(`SELECT * FROM pfleger WHERE persnr = ${req.params.id}`, function (err, results) {
		if (err) throw err;
		res.type('application/json').send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
});


module.exports = router;