var express = require('express');
var router = express.Router();
const db = require('../dbconn');

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

module.exports = router;