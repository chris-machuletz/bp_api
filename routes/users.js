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

/* GET users listing. */
router.get('/', function(req, res, next) {
	db.query('SELECT * from bewohner', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
});

module.exports = router;
