var express = require('express');
var router = express.Router();
const db = require('../dbconn');

const { check, validationResult } = require('express-validator');
const { body } = require('express-validator');
const { sanitizBody } = require('express-validator');

// Select all records from bewohner
router.get('/', function(req, res, next) {
	db.query('SELECT bewohner.bewohner_id, bewohner.nachname, bewohner.vorname, bewohner.zimmernummer, wohnbereich.name as wohnbereich, bewohner.pflegegrad, DATE_FORMAT(bewohner.geburtsdatum, "%d.%m.%Y") as geburtsdatum, bewohner.geschlecht from bewohner, zimmer, wohnbereich\
	WHERE bewohner.zimmernummer = zimmer.zimmernummer AND zimmer.wohnbereich_id = wohnbereich.wohnbereich_id', function (err, results) {
        if (err) throw err;
        res.type('application/json').send(JSON.stringify({"status": 200, "action": "get@bewohner/", "error": null, "response": results}));
	});
});

// Select a single record from bewohner
router.get('/:id', function(req, res, next) {
	db.query(`SELECT bewohner.bewohner_id, bewohner.nachname, bewohner.vorname, bewohner.zimmernummer, wohnbereich.name as wohnbereich, bewohner.pflegegrad, DATE_FORMAT(bewohner.geburtsdatum, "%d.%m.%Y") as geburtsdatum, bewohner.geschlecht from bewohner, zimmer, wohnbereich\
	WHERE bewohner.zimmernummer = zimmer.zimmernummer AND zimmer.wohnbereich_id = wohnbereich.wohnbereich_id AND bewohner.bewohner_id = ${req.params.id}; SELECT kontaktperson.kontaktperson_id, kontaktperson.nachname, kontaktperson.vorname, kp_bezeichnung.name as bezeichnung, kontaktperson.telefon FROM kontaktperson\
    INNER JOIN kp_bezeichnung ON kontaktperson.kp_bezeichnung_id=kp_bezeichnung.kp_bezeichnung_id\
    INNER JOIN bewohner ON kontaktperson.bewohner_id=bewohner.bewohner_id\
    WHERE kontaktperson.bewohner_id=${req.params.id}`, function (err, results) {
		if (err) throw err;
		// let resObj = JSON.stringify(results[0]);
		// let insertObj = JSON.stringify(results[1]);
		// resObj.nachname = 'test';
		// results[0] = JSON.parse(resObj);
		// console.log(resObj);
		// let testObj = { test: 'test'};
		// testObj.time = '00:01';
		// testObj.res = results[0];
		// testObj.kontaktperson = results[1];
		// console.log(insertObj);

		let testObj = JSON.parse(JSON.stringify(results[0]));
		testObj[0].kontaktperson = results[1];
		console.log(testObj);
		res.type('application/json').send(JSON.stringify({"status": 200, "action": "get@bewohner/:id", "error": null, "response": testObj}));
	});
});

// Select a single record from bewohner where id=zimmernummer
router.get('/zimmernummer/:id', function(req, res, next) {
	db.query(`SELECT bewohner.bewohner_id, bewohner.nachname, bewohner.vorname, bewohner.zimmernummer, wohnbereich.name as wohnbereich, bewohner.pflegegrad, DATE_FORMAT(bewohner.geburtsdatum, "%d.%m.%Y") as geburtsdatum, bewohner.geschlecht from bewohner, zimmer, wohnbereich\
	WHERE bewohner.zimmernummer = zimmer.zimmernummer AND zimmer.wohnbereich_id = wohnbereich.wohnbereich_id AND bewohner.zimmernummer = ${req.params.id}`, function (err, results) {
		if (err) throw err;
		res.type('application/json').send(JSON.stringify({"status": 200, "action": "get@bewohner/zimmernummer/:id", "error": null, "response": results}));
	});
});

// Add new record to bewohner
router.post('/new', [
    /*check('username').isLength({ min: 2 , max: 10}),
    check('password').isLength({ min: 5 }),
    check('email').isEmail()*/
    body('nachname')
        .isEmail()
        .normalizeEmail(),
    body('vorname')
        .not().isEmpty()
        .trim()
        .isAlpha(),
    body('zimmernummer')	//zahl max 3 zeichen
        .not().isEmpty()
        .isLength({min: 5}),
    body('pflegegrad')	//einzelne zahl
        .not().isEmpty()
        .trim()
        .isAlpha()
        .isLength({min: 2}),
    body('geburtsdatum')	//nur datum
        .not().isEmpty()
        .trim()
        .isAlpha()
        .isLength({min: 2}),
	body('geschlecht')		//m w oder d
        .not().isEmpty()
        .trim()
        .isAlpha()
        .isLength({min: 2}),
],  function(req, res) {
	
	const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(422).json({ error: error.array()});
	}
	
	const newBewohner = {
		nachname: req.body.nachname,
		vorname: req.body.vorname,
		zimmernummer: parseInt(req.body.zimmernummer),
		pflegegrad: parseInt(req.body.pflegegrad),
		geburtsdatum: req.body.geburtsdatum,
		geschlecht: req.body.geschlecht
	}
	db.query(`INSERT INTO bewohner (nachname, vorname, zimmernummer, pflegegrad, geburtsdatum, geschlecht) VALUES ('${newBewohner.nachname}', '${newBewohner.vorname}', ${parseInt(newBewohner.zimmernummer)}, ${parseInt(newBewohner.pflegegrad)}, STR_TO_DATE('${newBewohner.geburtsdatum}', '%Y-%m-%d'), '${newBewohner.geschlecht}')`, function (err, results) {
		if (err) {
			throw err
		} else {
			res.type('application/json').send(JSON.stringify({"status": 200, "action": "post@bewohner", "error": null, "data": {"nachname": req.body.nachname, "vorname": req.body.vorname, "zimmernummer": req.body.zimmernummer, "pflegegrad": req.body.pflegegrad, "geburtsdatum": req.body.geburtsdatum, "geschlecht": req.body.geschlecht}}));
		}
	});
});

module.exports = router;