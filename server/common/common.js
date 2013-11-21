var util = require('util')
	, events = require('events')

module.exports.CommonUtils = CommonUtils
module.exports.createResponseHandler = createResponseHandler

function CommonUtils() {}

CommonUtils.prototype.getEnvironment = function(environmentParam) {
	return environmentParam || 'development'
}

function createResponseHandler(response) {
	var responseHandler = new ResponseHandler()
	responseHandler.setResponse(response)

	responseHandler.on('close', function(jsonPayload) {
		console.log("responseHandler - close")
		response.json(jsonPayload)
	})

	return responseHandler
}

function ResponseHandler(response) {
	events.EventEmitter.call(this)
	this.response = response
}

util.inherits(ResponseHandler, events.EventEmitter);

ResponseHandler.prototype.setResponse = function(response) {
	this.response = response
}

ResponseHandler.prototype.getResponse = function() {
	return this.response
}
