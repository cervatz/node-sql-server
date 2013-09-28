var mysql = require('mysql')
	,async = require('async')

module.exports.ClickoutRepository = ClickoutRepository

function ClickoutRepository(config, response) {
	this.connection = mysql.createConnection({
	  	host     : config.vcgConnection.host,
	  	user     : config.vcgConnection.username,
	  	password : config.vcgConnection.password
	});
	this.connection.connect()
	this.response = response
};

// ClickoutRepository.prototype.get = function(id, callback) {
// 	console.log("ClickoutRepository.prototype.get " + id)
// 	this.connection.connect()
// 	this.connection.query('SELECT * FROM vcg_nlNL.clickout WHERE id=' + id, function(err, rows, fields) {
// 	 	if (err) throw err
// 		callback(rows, this.connection)
// 	});
// 	this.connection.end()
// }

ClickoutRepository.prototype.getAll = function(callback) {
	console.log("ClickoutRepository.prototype.getAll")

	this.connection.query('SELECT * FROM vcg_nlNL.clickout', function(err, rows, fields) {
	 	if (err) throw err

		async.forEach(rows,
			function(item, done) {
				console.log("processing single item - transform in DTO")
				done()
			}, 
			function(err) {
		    	console.log("finished processing all items and sending response");
		    	callback(rows);
		});

	});
	// 
}

ClickoutRepository.prototype.sendBack = function(results) {
	this.connection.end()
	this.response.json(results);
}

