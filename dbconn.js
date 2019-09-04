const mysql = require('mysql');

//DB connection for plesk
// const db = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'alexa_db_user',
//     password : '10iw?i3I',
//     database : 'cm_alexa',
//     multipleStatements: true
// });


//DB connection for dmprojekt19
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'fdai',
    password : 'gPpK/tP*Iz$&',
    database : 'bp_pflegeheim',
    multipleStatements: true
});

//DB connection for localhost
// const db = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     database : 'bp_pflegeheim',
//     multipleStatements: true
// });

//Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySQL Connected');
});

module.exports = db;