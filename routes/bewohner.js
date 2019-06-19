var express = require('express');
var router = express.Router();
const mysql = require('mysql');

//DB connection for plesk
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'alexa_db_user',
    password : '10iw?i3I',
    database : 'cm_alexa'
});

//Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySQL Connected');
});

//Select all records from bewohner
app.get('/', function(req, res, next) {
	db.query('SELECT *, DATE_FORMAT(geburtsdatum, "%d.%m.%Y") as geburtsdatum FROM bewohner', function (err, results) {
        if (err) throw err;
        res.type('application/json').send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
});

//Select a single record from bewohner
app.get('/:id', function(req, res, next) {
	db.query(`SELECT *, DATE_FORMAT(geburtsdatum, "%d.%m.%Y") as geburtsdatum FROM bewohner WHERE bewohner_id = ${req.params.id}`, function (err, results) {
		if (err) throw err;
		res.type('application/json').send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
});

module.exports = router;