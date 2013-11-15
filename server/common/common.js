var util = require('util')
	, events = require('events')

module.exports.CommonUtils = CommonUtils
module.exports.ConnectionHandler = ConnectionHandler

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

