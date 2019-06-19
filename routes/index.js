const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/test', (req, res) => {
  res.send('Test route');
});

// router.get('/', function(req, res, next) {
// 	connection.query('SELECT * from bewohner', function (error, results, fields) {
// 		if (error) throw error;
// 		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
// 	});
// });

module.exports = router;
