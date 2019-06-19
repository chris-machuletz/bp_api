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

//Select all records from pfleger
router.get('/', function(req, res, next) {
	db.query('SELECT * FROM pfleger', function (err, results) {
        if (err) throw err;
        res.type('application/json').send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
});

//Select a single record from pfleger
router.get('/:id', function(req, res, next) {
	db.query(`SELECT * FROM pfleger WHERE pfleger_id = ${req.params.id}`, function (err, results) {
		if (err) throw err;
		res.type('application/json').send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
});

module.exports = router;