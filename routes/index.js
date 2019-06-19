var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   console.log("Connected to Index");
//   res.render('index', { title: 'Express powered by Plesk' });
// });

router.get('/', function(req, res, next) {
	connection.query('SELECT * from bewohner', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
});

module.exports = router;
