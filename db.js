const mysql = require('mysql');

const config = {
    host: "127.0.0.1",
    user: "ethiopqt_group",
    password: "project@03",
    database: "ethiopqt_jobs"
};

const conn = mysql.createConnection(config);

module.exports = conn;