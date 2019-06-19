var express = require('express');
var router = express.Router();
//const mysql = require('mysql');
const db = require('../db_conn');

/* GET users listing. */
router.get('/', function(req, res, next) {
	db.query('SELECT * from bewohner', function (error, results, fields) {
		if (error) throw error;
		res.type('application/json').send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
});

module.exports = router;
