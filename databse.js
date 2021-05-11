const mysql = require("mysql");

// Create Connection
const conn   = mysql.createConnection({
    host:     "localhost",
    user:     "root",
    password: "1234",
    database: "eventsql"
});

// Connecting
conn.connect((err) => {
    if(err){
        throw err;
    }
    console.log("Connected to MySql database!");
});

module.exports = conn;