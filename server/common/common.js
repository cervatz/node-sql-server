var util = require('util')
	, events = require('events')

module.exports.CommonUtils = CommonUtils
module.exports.createConnectionHandler = createConnectionHandler

function CommonUtils() {}

CommonUtils.prototype.getEnvironment = function(environmentParam) {
	return environmentParam || 'development'
}

CommonUtils.prototype.buildCallBack = function(repository, response) {
  var callBack = function(results) {
    repository.closeConnection()
    response.json(results)
  }
  return callBack;
}



function createConnectionHandler(response) {
	var connectionHandler = new ConnectionHandler()
	connectionHandler.setResponse(response)

	connectionHandler.on('open', function(connection) {
		console.log("ConnectionHandler - open")
		this.setConnection(connection)
		this.connection.connect()
	})

	connectionHandler.on('close', function(jsonPayload) {
		console.log("ConnectionHandler - close")
		response.json(jsonPayload)
		this.connection.end()
	})

	return connectionHandler
}


function ConnectionHandler(connection, response) {
	events.EventEmitter.call(this)
	this.connection = connection
	this.response = response
}

util.inherits(ConnectionHandler, events.EventEmitter);

ConnectionHandler.prototype.setConnection = function(connection) {
	this.connection = connection
}

ConnectionHandler.prototype.setResponse = function(response) {
	this.response = response
}

ConnectionHandler.prototype.getConnection = function() {
	return this.connection
}

ConnectionHandler.prototype.getResponse = function() {
	return this.response
}
