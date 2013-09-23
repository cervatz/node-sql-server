var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
});

module.exports.ClickoutRepository = ClickoutRepository

function ClickoutRepository()  {};

ClickoutRepository.prototype.get = function(id) {
	console.log("ClickoutRepository.prototype.get " + id);
	connection.connect();
	connection.query('SELECT username from blog.blog_user', function(err, rows, fields) {
	  if (err) throw err;
	  console.log('The solution is: ', rows[0].username);
	});
	connection.end();

}
