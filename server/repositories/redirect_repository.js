var mysql = require('mysql')
	,async = require('async')

module.exports.RedirectRepository = RedirectRepository

function RedirectRepository() {
	this.connection = mysql.createConnection({
	  	host     : GLOBAL.config.vcgConnection.host,
	  	user     : GLOBAL.config.vcgConnection.username,
	  	password : GLOBAL.config.vcgConnection.password
	});
};

RedirectRepository.prototype.get = function(id, response) {
	console.log("RedirectRepository.prototype.get " + id)
	this.openConnection()

	this.connection.query('SELECT * FROM cgtools.redirectProductUrl WHERE redirectProductUrlId=' + id, function(err, rows, fields) {
	 	if (err) throw err
	 		
		callback(rows[0])
	});
}


RedirectRepository.prototype.getAll = function(response) {
	console.log("RedirectRepository.prototype.getAll")

	var connection = this.connection
	connection.connect

	var query = connection.query('SELECT * FROM cgtools.redirectProductUrl');

	console.log("enrico1");

	query.on('result', function(row) {
		console.log("enrico2");
	    // Pausing the connnection is useful if your processing involves I/O
	    connection.pause();

	    processRow(row, function() {
	      connection.resume();
	    });
	}).on('end', function() {
		console.log("enrico3");
		connection.end()
    // all rows have been received
  	});


  	function processRow(row, rowCallback) {
  		response.json(row)
  		rowCallback()
  	}

}

