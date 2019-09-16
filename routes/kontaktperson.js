var express = require('express');
var router = express.Router();
const db = require('../dbconn');

const { check, validationResult } = require('express-validator');
const { body } = require('express-validator');
const { sanitizBody } = require('express-validator');

// Select all records from kontaktperson
router.get('/', function(req, res, next) {
	db.query(`SELECT kontaktperson.kontaktperson_id, kontaktperson.nachname, kontaktperson.vorname, kp_bezeichnung.name as bezeichnung, CONCAT(bewohner.vorname, ' ', bewohner.nachname, ' (id:', bewohner.bewohner_id, ')') as bewohner, kontaktperson.telefon FROM kontaktperson\
    INNER JOIN kp_bezeichnung ON kontaktperson.kp_bezeichnung_id = kp_bezeichnung.kp_bezeichnung_id\
    INNER JOIN bewohner ON kontaktperson.bewohner_id = bewohner.bewohner_id`, function (err, results) {
        if (err) throw err;
        res.type('application/json').send(JSON.stringify({"status": 200, "action": "get@kontaktperson/", "error": null, "response": results}));
	});
});

// Select record from kontaktperson where :id = bewohner_id
router.get('/:id', function(req, res, next) {
	db.query(`SELECT kontaktperson.kontaktperson_id, kontaktperson.nachname, kontaktperson.vorname, kp_bezeichnung.name as bezeichnung, kontaktperson.telefon FROM kontaktperson\
    INNER JOIN kp_bezeichnung ON kontaktperson.kp_bezeichnung_id=kp_bezeichnung.kp_bezeichnung_id\
    INNER JOIN bewohner ON kontaktperson.bewohner_id=bewohner.bewohner_id\
    WHERE kontaktperson.bewohner_id=${req.params.id}`
    , function (err, results) {
        if (err) throw err;
        res.type('application/json').send(JSON.stringify({"status": 200, "action": "get@kontaktperson/:id", "error": null, "response": results}));
	});
});

// Add new record to kontaktperson
router.post('/new/:id', [
    body('nachname')
		.not().isEmpty()
		.trim()
		.isAlpha(),
    body('vorname')
        .not().isEmpty()
        .trim()
        .isAlpha(),
	body('kp_bezeichnung_id')	//??????????
		.trim()
		.isInt()
        .not().isEmpty(),
	body('telefon')	
        .trim()
        .isInt()
        .isLength({min: 3, max: 15})
        .not().isEmpty(),
], function(req, res) {
    
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(422).json({ error: error.array()});
    }
    
	const newKP = {
        kp_bezeichnung_id: parseInt(req.body.kp_bezeichnung_id),
        nachname: req.body.nachname,
		vorname: req.body.vorname,
		telefon: req.body.telefon
	}
	db.query(`INSERT INTO kontaktperson (bewohner_id, kp_bezeichnung_id, nachname, vorname, telefon) VALUES (${req.params.id}, ${newKP.kp_bezeichnung_id}, '${newKP.nachname}', '${newKP.vorname}', '${newKP.telefon}')`, function (err, results) {
		if (err) {
			throw err
		} else {
			res.type('application/json').send(JSON.stringify({"status": 200, "action": "post@bewohner", "error": null, "data": {"bewohner_id": req.body.bewohner_id, "kp_bezeichnung_id": req.body.kp_bezeichnung_id, "nachname": req.body.nachname, "vorname": req.body.vorname, "telefon": req.body.telefon}}));
		}
	});
});

// Update record from kontaktperson where :id = kontaktperson_id
router.post('/update/:id', [
    body('nachname')
		.not().isEmpty()
		.trim()
		.isAlpha(),
    body('vorname')
        .not().isEmpty()
        .trim()
        .isAlpha(),
	body('telefon')	
		.trim()
        .isInt()
        .isLength({min: 3, max: 15})
		.not().isEmpty(),
], function(req, res) {
    const updateKP = {
        nachname: req.body.nachname,
        vorname: req.body.vorname,
        telefon: req.body.telefon
    }
    db.query(`UPDATE kontaktperson SET nachname="${updateKP.nachname}", vorname="${updateKP.vorname}", telefon="${updateKP.telefon}" WHERE kontaktperson_id=${req.params.id}`, function (err, results) {
        if (err) {
            throw err;
        } else {
            res.type('application/json').send(JSON.stringify({"status": 200, "action": "put@kontaktperson/update/:id", "error": null, "response": results}));
        }
	});
});

// Delete record from kontaktperson where :id = kontaktperson_id
router.get('/delete/:id', function(req, res, next) {
    db.query(`DELETE FROM kontaktperson WHERE kontaktperson_id=${req.params.id}`, function (err, results) {
        if (err) throw err;
        res.type('application/json').send(JSON.stringify({"status": 200, "action": "delete@kontaktperson/delete/:id", "error": null, "response": results}));
	});
});

module.exports = router;