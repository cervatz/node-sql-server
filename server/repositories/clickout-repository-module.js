var mysql = require('mysql')
	,async = require('async')

module.exports.ClickoutRepository = ClickoutRepository

function ClickoutRepository() {
	this.connection = mysql.createConnection({
	  	host     : GLOBAL.config.vcgConnection.host,
	  	user     : GLOBAL.config.vcgConnection.username,
	  	password : GLOBAL.config.vcgConnection.password
	});
};

ClickoutRepository.prototype.get = function(id, callback) {
	console.log("ClickoutRepository.prototype.get " + id)
	this.openConnection()

	this.connection.query('SELECT * FROM cgtools.redirectProductUrl WHERE redirectProductUrlId=' + id, function(err, rows, fields) {
	 	if (err) throw err
	 		
		callback(rows[0])
	});
}

ClickoutRepository.prototype.openConnection = function() {
	this.connection.connect
}

ClickoutRepository.prototype.getAll = function(callback) {
	console.log("ClickoutRepository.prototype.getAll")
	this.openConnection()

	this.connection.query('SELECT * FROM cgtools.redirectProductUrl', function(err, rows, fields) {
	 	if (err) throw err

		async.forEach(rows,
			function(item, done) {
				// console.log("processing single item - transform in DTO")
				done()
			}, 
			function(err) {
		    	// console.log("finished processing all items and sending response");
		    	callback(rows);
		});

	});
	// 
}

ClickoutRepository.prototype.closeConnection = function() {
	this.connection.end()
}

