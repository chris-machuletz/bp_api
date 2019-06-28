var express = require('express');
var router = express.Router();
const db = require('../dbconn');

// Select all records from user
router.get('/', function(req, res, next) {
	db.query('SELECT * FROM user', function (err, results) {
        if (err) throw err;
        res.type('application/json').send(JSON.stringify({"status": 200, "action": "get@user/", "error": null, "response": results}));
	});
});

// // Select a single user record by 'user_id'
// router.get('/:id', function(req, res, next) {
// 	db.query(`SELECT * FROM user WHERE user_id = ${req.params.id}`, function (err, results) {
// 		if (err) throw err;
// 		res.type('application/json').send(JSON.stringify({"status": 200, "action": "get@user/:id", "error": null, "response": results}));
// 	});
// });

// Select single user record by 'username'
router.get('/:username', function(req, res, next) {
	db.query(`SELECT * FROM user WHERE username = '${req.params.username}'`, function (err, results) {
		if (err) throw err;
		res.type('application/json').send(JSON.stringify({"status": 200, "action": "get@user/:username", "error": null, "response": results}));
	});
});

// Add new record to user
router.post('/new', function(req, res) {
	
	const newUser = {
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email || NULL
	}
	db.query(`INSERT INTO user (username, password, firstname, lastname, email) VALUES ('${newUser.username}', '${newUser.password}', '${newUser.firstname}', '${newUser.lastname}', '${newUser.email}')`, function (err, results) {
		if (err) {
			throw err
		} else {
			res.type('application/json').send(JSON.stringify({"status": 200, "action": "post@user", "error": null, "data": {"username": req.body.username, "password": "****", "firstname": req.body.firstname, "lastname": req.body.lastname, "email": req.body.email}}));
		}
	});
});

// Update record from user where :username = username
router.post('/update/:username', function(req, res) {
    const updateUser = {
        password: req.user.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email || NULL
    }
    db.query(`UPDATE user SET password="${updateUser.password}", firstname="${updateUser.firstname}", lastname="${updateUser.lastname}", email="${updateUser.email}" WHERE username=${req.params.username}`, function (err, results) {
        if (err) {
            throw err;
        } else {
            res.type('application/json').send(JSON.stringify({"status": 200, "action": "put@username/update/:username", "error": null, "response": results}));
        }
	});
});

// Delete record from user where :username = username
router.get('/delete/:username', function(req, res) {
    db.query(`DELETE FROM user WHERE username=${req.params.username}`, function (err, results) {
        if (err) throw err;
        res.type('application/json').send(JSON.stringify({"status": 200, "action": "delete@username/delete/:username", "error": null, "response": results}));
	});
});


module.exports = router;