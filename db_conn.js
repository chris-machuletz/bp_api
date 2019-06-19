//DB connection for plesk
const dbconn = mysql.createConnection({
    host     : 'localhost',
    user     : 'alexa_db_user',
    password : '10iw?i3I',
    database : 'cm_alexa'
});

//Connect
dbconn.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySQL Connected');
});

module.exports = dbconn;