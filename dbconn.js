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

module.exports = db;