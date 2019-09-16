var express = require('express');
var router = express.Router();
const db = require('../dbconn');

// Select all records from vitalwerttransaktion
router.get('/all', function (req, res, next) {
    db.query(`SELECT vitalwerttransaktion.vitalwerttransaktion_id, vitalwerttransaktion.bewohner_id, CONCAT(bewohner.vorname, ' ', bewohner.nachname) as bewohner, vitalwerttransaktion.vitalwert_id, vitalwert.name as vitalwert, vitalwerttransaktion.messwert, vitalwerttransaktion.pfleger_id, CONCAT(pfleger.vorname, ' ', pfleger.nachname) as pfleger, DATE_FORMAT(vitalwerttransaktion.datum, '%Y-%m-%d') as datum, DATE_FORMAT(vitalwerttransaktion.datum, '%H:%i:%s') as uhrzeit\
    FROM vitalwerttransaktion, vitalwert, bewohner, pfleger\
    WHERE vitalwerttransaktion.bewohner_id = bewohner.bewohner_id AND vitalwerttransaktion.vitalwert_id = vitalwert.vitalwert_id AND vitalwerttransaktion.pfleger_id = pfleger.pfleger_id ORDER BY vitalwerttransaktion.datum DESC`, function (err, results) {
        if (err) throw err;
        res.type('application/json').send(JSON.stringify({ "status": 200, "action": "get@vitalwert/all", "error": null, "response": results }));
    });
});

// Select all vitalwerttransaktion records from a single bewohner
router.get('/:id', function (req, res, next) {
    db.query(`SELECT vitalwerttransaktion.vitalwerttransaktion_id, vitalwerttransaktion.bewohner_id, CONCAT(bewohner.vorname, ' ', bewohner.nachname) as bewohner, vitalwerttransaktion.vitalwert_id, vitalwert.name as vitalwert, vitalwerttransaktion.messwert, vitalwerttransaktion.pfleger_id, CONCAT(pfleger.vorname, ' ', pfleger.nachname) as pfleger, DATE_FORMAT(vitalwerttransaktion.datum, '%Y-%m-%d') as datum, DATE_FORMAT(vitalwerttransaktion.datum, '%H:%i:%s') as uhrzeit\
    FROM vitalwerttransaktion, vitalwert, bewohner, pfleger\
    WHERE vitalwerttransaktion.bewohner_id = bewohner.bewohner_id AND vitalwerttransaktion.vitalwert_id = vitalwert.vitalwert_id AND vitalwerttransaktion.pfleger_id = pfleger.pfleger_id AND bewohner.bewohner_id = ${req.params.id} ORDER BY vitalwerttransaktion.datum DESC`, function (err, results) {
        if (err) throw err;
        res.type('application/json').send(JSON.stringify({ "status": 200, "action": `get@vitalwert/${req.params.id}`, "error": null, "response": results }));
    });
});

/**
 * @param(val1):    vitalwert
 * @param(val2):    bewohner_id
 * Gibt alle Einträge eines bestimmten vitalwerts (val1) eines bestimmten Bewohners (val2) zurück
 * 
 * ODER:
 * @param(val1):    bewohner_id
 * @param(val2):    Anzahl letzte Einträge
 * Gibt (val2) Vitalwert-Einträge eines Bewohners (val1) zurück
 * 
 * BEZEICHNUNGEN FÜR VITALWERTE:
 * puls_min     PULS (min)
 * blutdruck_sys Blutdruck (Sys)
 * blutdruck_dia Blutdruck (Dia)
 * koerpertemp  Körpertemperatur (°C)
 * blutzucker   Blutzucker
 * bmi          BMI
 * groesse      Größe (cm)
 * gewicht      Gewicht (kg)
 */
router.get('/:val1/:val2', function (req, res, next) {
    if (!isNaN(req.params.val1)) {
        db.query(`SELECT vitalwerttransaktion.vitalwerttransaktion_id, vitalwerttransaktion.bewohner_id, CONCAT(bewohner.vorname, ' ', bewohner.nachname) as bewohner, vitalwerttransaktion.vitalwert_id, vitalwert.name as vitalwert, vitalwerttransaktion.messwert, vitalwerttransaktion.pfleger_id, CONCAT(pfleger.vorname, ' ', pfleger.nachname) as pfleger, DATE_FORMAT(vitalwerttransaktion.datum, '%Y-%m-%d') as datum, DATE_FORMAT(vitalwerttransaktion.datum, '%H:%i:%s') as uhrzeit\
        FROM vitalwerttransaktion, vitalwert, bewohner, pfleger\
        WHERE vitalwerttransaktion.bewohner_id = bewohner.bewohner_id AND vitalwerttransaktion.vitalwert_id = vitalwert.vitalwert_id AND vitalwerttransaktion.pfleger_id = pfleger.pfleger_id AND bewohner.bewohner_id = ${req.params.val1} ORDER BY vitalwerttransaktion.datum DESC LIMIT ${req.params.val2}`, function (err, results) {
        if (err) throw err;
            res.type('application/json').send(JSON.stringify({ "status": 200, "action": `get@vitalwert/${req.params.val1}/${req.params.val2}`, "error": null, "response": results }));
        });
    } else {
        db.query(`SELECT vitalwerttransaktion.vitalwerttransaktion_id, vitalwerttransaktion.bewohner_id, CONCAT(bewohner.vorname, ' ', bewohner.nachname) as bewohner, vitalwerttransaktion.vitalwert_id, vitalwert.name as vitalwert, vitalwerttransaktion.messwert, vitalwerttransaktion.pfleger_id, CONCAT(pfleger.vorname, ' ', pfleger.nachname) as pfleger, DATE_FORMAT(vitalwerttransaktion.datum, '%Y-%m-%d') as datum, DATE_FORMAT(vitalwerttransaktion.datum, '%H:%i:%s') as uhrzeit\
        FROM vitalwerttransaktion, vitalwert, bewohner, pfleger\
        WHERE vitalwerttransaktion.bewohner_id = bewohner.bewohner_id AND vitalwerttransaktion.vitalwert_id = vitalwert.vitalwert_id AND vitalwerttransaktion.pfleger_id = pfleger.pfleger_id AND bewohner.bewohner_id = ${req.params.val2} AND vitalwert.bezeichnung = '${req.params.val1}' ORDER BY vitalwerttransaktion.datum DESC`, function (err, results) {
        if (err) throw err;
        res.type('application/json').send(JSON.stringify({ "status": 200, "action": `get@vitalwert/${req.params.val1}/${req.params.val2}`, "error": null, "response": results }));
    });
    }
    
});

// Select last (count) records from a single bewohner and a specific vitalwert
router.get('/:vitalwert/:bewohnerId/:count', function (req, res, next) {
    db.query(`SELECT vitalwerttransaktion.vitalwerttransaktion_id, vitalwerttransaktion.bewohner_id, CONCAT(bewohner.vorname, ' ', bewohner.nachname) as bewohner, vitalwerttransaktion.vitalwert_id, vitalwert.name as vitalwert, vitalwerttransaktion.messwert, vitalwerttransaktion.pfleger_id, CONCAT(pfleger.vorname, ' ', pfleger.nachname) as pfleger, DATE_FORMAT(vitalwerttransaktion.datum, '%Y-%m-%d') as datum, DATE_FORMAT(vitalwerttransaktion.datum, '%H:%i:%s') as uhrzeit\
    FROM vitalwerttransaktion, vitalwert, bewohner, pfleger\
    WHERE vitalwerttransaktion.bewohner_id = bewohner.bewohner_id AND vitalwerttransaktion.vitalwert_id = vitalwert.vitalwert_id AND vitalwerttransaktion.pfleger_id = pfleger.pfleger_id AND bewohner.bewohner_id = ${req.params.bewohnerId} AND vitalwert.bezeichnung = '${req.params.vitalwert}' ORDER BY vitalwerttransaktion.datum DESC LIMIT ${req.params.count}`, function (err, results) {
        if (err) throw err;
        res.type('application/json').send(JSON.stringify({ "status": 200, "action": `get@vitalwert/${req.params.vitalwert}/${req.params.bewohnerId}/${req.params.count}`, "error": null, "response": results }));
    });
});

// Add new record to vitalwerttransaktion @param(id) = bewohner_id
router.post('/new/:id', function(req, res) {
	
	const newVT = {
        vitalwertId: parseInt(req.body.vitalwertId),
        messwert: req.body.messwert,
		pflegerId: req.body.pflegerId
	}
	db.query(`INSERT INTO vitalwerttransaktion (bewohner_id, vitalwert_id, messwert, pfleger_id) VALUES (${req.params.id}, ${newVT.vitalwertId}, ${newVT.messwert}, ${newVT.pflegerId})`, function (err, results) {
		if (err) {
			throw err
		} else {
			res.type('application/json').send(JSON.stringify({"status": 200, "action": `post@vitalwert/new/${req.params.id}`, "error": null, "data": {"bewohner_id": req.body.bewohner_id, "kp_bezeichnung_id": req.body.kp_bezeichnung_id, "nachname": req.body.nachname, "vorname": req.body.vorname, "telefon": req.body.telefon}}));
		}
	});
});

module.exports = router;