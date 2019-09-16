var express = require('express');
var router = express.Router();
const db = require('../dbconn');

const { check, validationResult } = require('express-validator');
const { body } = require('express-validator');
const { sanitizBody } = require('express-validator');

// Select all records from user
router.get('/', function(req, res, next) {
    /*res.render('user', {title: 'Form Validation', success: false, errors: req.session.errors});
    req.session.errors = null;
*/
	db.query('SELECT * FROM users', function (err, results) {
        if (err) throw err;
        res.type('application/json').send(JSON.stringify({"status": 200, "action": "get@user/", "error": null, "response": results}));
	});
});

router.post('/submit', function(req, res, next) {
//check validity
/*req.check('email', 'Invalid email adress').isEmail();
req.check('password', 'Invalid password').isLength({min: 4});
*/
var errors = req.validationErrors();
if (errors) {
    req.session.errors = errors;
}
res.redirect();
});
// // Select a single user record by 'user_id'
// router.get('/:id', function(req, res, next) {
// 	db.query(`SELECT * FROM user WHERE user_id = ${req.params.id}`, function (err, results) {
// 		if (err) throw err;
// 		res.type('application/json').send(JSON.stringify({"status": 200, "action": "get@user/:id", "error": null, "response": results}));
// 	});
// });

// Select single user record by 'username'
router.get('/:username', [    
    body('email')
        .isEmail()
        .normalizeEmail(),
    body('username')
        .not().isEmpty()
        .trim()
        .isAlpha(),
    body('password')    //achtung hier ist es noch möglich code reinzuklatschen
        .not().isEmpty()
        .isLength({min: 5}),
    body('firstname')
        .not().isEmpty()
        .trim()
        .isAlpha()
        .isLength({min: 2}),
    body('lastname')
        .not().isEmpty()
        .trim()
        .isAlpha()
        .isLength({min: 2}),
], function(req, res, next) {
	db.query(`SELECT * FROM users WHERE username = '${req.params.username}'`, function (err, results) {
		if (err) throw err;
		res.type('application/json').send(JSON.stringify({"status": 200, "action": "get@user/:username", "error": null, "response": results}));
	});
});


//
// Add new record to user
router.post('/new', [
    /*check('username').isLength({ min: 2 , max: 10}),
    check('password').isLength({ min: 5 }),
    check('email').isEmail()*/
    body('email')
        .isEmail()
        .normalizeEmail(),
    body('username')
        .not().isEmpty()
        .trim()
        .isAlpha(),
    body('password')
        .not().isEmpty()
        .isLength({min: 5}),
    body('firstname')
        .not().isEmpty()
        .trim()
        .isAlpha()
        .isLength({min: 2}),
    body('lastname')
        .not().isEmpty()
        .trim()
        .isAlpha()
        .isLength({min: 2}),
        //.escape()
], function(req, res) {
    
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(422).json({ error: error.array()});
    }

	const newUser = {
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email || NULL
    }

	db.query(`INSERT INTO users (username, passwd, firstname, lastname, email) VALUES ('${newUser.username}', '${newUser.password}', '${newUser.firstname}', '${newUser.lastname}', '${newUser.email}')`, function (err, results) {
		if (err) {
			throw err
		} else {
			res.type('application/json').send(JSON.stringify({"status": 200, "action": "post@user", "error": null, "data": {"username": req.body.username, "password": "****", "firstname": req.body.firstname, "lastname": req.body.lastname, "email": req.body.email}})); //das geht zurück an der benutzer von der api
		}
	});
});

// Update record from user where :username = username
router.post('/update/:username', function(req, res) {
    const updateUser = {
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email || NULL
    }
    db.query(`UPDATE users SET passwd="${updateUser.password}", firstname="${updateUser.firstname}", lastname="${updateUser.lastname}", email="${updateUser.email}" WHERE username="${req.params.username}"`, function (err, results) {
        if (err) {
            throw err;
        } else {
            res.type('application/json').send(JSON.stringify({"status": 200, "action": "put@username/update/:username", "error": null, "response": results}));
        }
	});
});

// Delete record from user where :username = username
router.get('/delete/:username', function(req, res) {
    db.query(`DELETE FROM users WHERE username="${req.params.username}"`, function (err, results) {
        if (err) throw err;
        res.type('application/json').send(JSON.stringify({"status": 200, "action": "delete@username/delete/:username", "error": null, "response": results}));
	});
});


module.exports = router;