var express = require('express');
var router = express.Router();
const db = require('../dbconn');

// Select all records from bewohner
router.get('/', function(req, res, next) {
	db.query('SELECT *, DATE_FORMAT(geburtsdatum, "%d.%m.%Y") as geburtsdatum FROM bewohner', function (err, results) {
        if (err) throw err;
        res.type('application/json').send(JSON.stringify({"status": 200, "action": "get@bewohner", "error": null, "response": results}));
	});
});

// Select a single record from bewohner
router.get('/:id', function(req, res, next) {
	db.query(`SELECT *, DATE_FORMAT(geburtsdatum, "%d.%m.%Y") as geburtsdatum FROM bewohner WHERE bewohner_id = ${req.params.id}`, function (err, results) {
		if (err) throw err;
		res.type('application/json').send(JSON.stringify({"status": 200, "action": "get@bewohner/:id", "error": null, "response": results}));
	});
});

// Add new record to bewohner
router.post('/test', function(req, res) {
	
	// const newBewohner = {
	// 	nachname: req.body.nachname,
	// 	vorname: req.body.vorname,
	// 	zimmernummer: req.body.zimmernummer,
	// 	pflegegrad: req.body.pflegegrad,
	// 	geburtsdatum: req.body.geburtsdatum,
	// 	geschlecht: req.body.geschlecht
	// }
	db.query(`INSERT INTO bewohner (nachname, vorname, zimmernummer, pflegegrad, geburtsdatum, geschlecht) VALUES ('test', 'test', 105, 1, STR_TO_DATE('12-11-2010', '%d-%m-%Y'), 'm')`, function (err, results) {
		if (err) {
			throw err
		} else {
			res.type('application/json').send(JSON.stringify({"status": 200, "action": "post@bewohner", "error": null, "response": results}));
		}
	});

	// res.type('application/json').send(JSON.stringify({"status": 200, "action": "post@bewohner/test", "error": null}));
});

// router.post("/api/data", (request, response) => {
// 	const data = request.body;
// 	const timestamp = Date.now();
// 	data.timestamp = timestamp;
// 	database.insert(data);
// 	console.log("Neuer HighScore eingetragen");
// 	response.end();
//   });

module.exports = router;