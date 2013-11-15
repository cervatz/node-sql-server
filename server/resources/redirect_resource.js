var redirect_repository = require('./../repositories/redirect_repository')
	, common = require('./../common/common')

module.exports.getResource = getResource

function getResource() {
	return new RedirectResource();
}

function RedirectResource() {}

RedirectResource.prototype.getRedirect = function(request, response) {
	var redirectRepository = new redirect_repository.RedirectRepository();
	var id = request.params.id;

  redirectRepository.get(id, response);
}

RedirectResource.prototype.getAllRedirects = function(request, response) {
	var connectionHandler = createConnectionHandler(response)
	var redirectRepository = new redirect_repository.RedirectRepository();
	redirectRepository.getAll(connectionHandler);
}


// enrico this should go in common
function createConnectionHandler(response) {
	var connectionHandler = new common.ConnectionHandler()
	connectionHandler.setResponse(response)

	connectionHandler.on('pause', function() {
		console.log("ConnectionHandler - pause")
		this.connection.pause()
	});

	connectionHandler.on('resume', function() {
		console.log("ConnectionHandler - resume")
		this.connection.resume()
	});

	connectionHandler.on('end', function(jsonPayload) {
		console.log("ConnectionHandler - end")
		response.json(jsonPayload)
		this.connection.end()
	});

	return connectionHandler
}



