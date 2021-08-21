var mysql = require('mysql');
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Aaditya7$",
  database: 'get_placed'
});
connection.connect();
module.exports = connection;