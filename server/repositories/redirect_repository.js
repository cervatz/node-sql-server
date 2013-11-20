var mysql = require('mysql')

module.exports.RedirectRepository = RedirectRepository

function RedirectRepository() {
	this.connection = mysql.createConnection({
	  	host     : GLOBAL.config.vcgConnection.host,
	  	user     : GLOBAL.config.vcgConnection.username,
	  	password : GLOBAL.config.vcgConnection.password
	});
};

RedirectRepository.prototype.get = function(id, connectionHandler) {
	// console.log("RedirectRepository.prototype.get " + id + " entering")

	connectionHandler.emit('open', this.connection)

	this.connection.query('SELECT * FROM cgtools.redirectProductUrl WHERE redirectProductUrlId=' + id, function(err, rows, fields) {
	 	if (err) throw err
	 		
		connectionHandler.emit('close', rows[0])
	});
	// console.log("RedirectRepository.prototype.get " + id + " leaving")
}


RedirectRepository.prototype.getAll = function(connectionHandler) {
	// console.log("RedirectRepository.prototype.getAll - entering")

	connectionHandler.emit('open', this.connection)

	var query = connectionHandler.getConnection().query('SELECT * FROM cgtools.redirectProductUrl', function(err, rows, fields) {
			if (err) throw err

			connectionHandler.emit('close', rows)
		}
	)

	// console.log("RedirectRepository.prototype.getAll - leaving")
}

