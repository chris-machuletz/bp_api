var express = require('express');
var router = express.Router();
const db = require('../dbconn');

// Select all records from bewohner
router.get('/', function(req, res, next) {
	db.query('SELECT *, DATE_FORMAT(geburtsdatum, "%d.%m.%Y") as geburtsdatum FROM bewohner', function (err, results) {
        if (err) throw err;
        res.type('application/json').send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
});

// Select a single record from bewohner
router.get('/:id', function(req, res, next) {
	db.query(`SELECT *, DATE_FORMAT(geburtsdatum, "%d.%m.%Y") as geburtsdatum FROM bewohner WHERE bewohner_id = ${req.params.id}`, function (err, results) {
		if (err) throw err;
		res.type('application/json').send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
});

// Add new record to bewohner
router.post('/', function(req, res, next) {
	const newBewohner = {
		nachname: req.body.nachname,
		vorname: req.body.vorname,
		zimmernummer: req.body.zimmernummer,
		pflegegrad: req.body.pflegegrad,
		geburtsdatum: req.body.geburtsdatum,
		geschlecht: req.body.geschlecht
	}
	db.query(`INSERT INTO bewohner (nachname, vorname, zimmernummer, pflegegrad, geburtsdatum, geschlecht) VALUES(${newBewohner.nachname}, ${newBewohner.vorname}, ${newBewohner.zimmernummer}, ${newBewohner.pflegegrad}, ${newBewohner.geburtsdatum}, ${newBewohner.geschlecht} )`, function (err, results) {
		if (err) throw err;
		res.type('application/json').send(JSON.stringify({"status": 200, "error": null, "response": newBewohner}));
	});
});

module.exports = router;