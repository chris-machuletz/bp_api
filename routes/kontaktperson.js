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

// Update record from kontaktperson where :id = kontaktperson_id
router.post('/update/:id', function(req, res, next) {
    const updatedKP = {
        nachname = req.body.nachname,
        vorname = req.body.vorname,
        telefon = req.body.telefon
    }
    db.query(`UPDATE kontaktperson SET nachname='${updatedKP.nachname}', vorname='${updatedKP.vorname}', telefon='${updatedKP.telefon}' WHERE kontaktperson_id=${req.params.id}`, function (err, results) {
        if (err) throw err;
        res.type('application/json').send(JSON.stringify({"status": 200, "action": "put@kontaktperson/update/:id", "error": null, "response": results}));
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