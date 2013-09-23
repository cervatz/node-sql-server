var mysql = require('mysql');

module.exports.ClickoutRepository = ClickoutRepository

function ClickoutRepository(config) {
	this.connection = mysql.createConnection({
	  	host     : config.vcgConnection.host,
	  	user     : config.vcgConnection.username,
	  	password : config.vcgConnection.password
	});
};

ClickoutRepository.prototype.get = function(id) {
	console.log("ClickoutRepository.prototype.get " + id);
	this.connection.connect();
	this.connection.query('SELECT * FROM vcg_nlNL.clickout', function(err, rows, fields) {
	 	if (err) throw err;

		console.log('Retrieve %d lines', rows.length);
	});
	this.connection.end();
}
