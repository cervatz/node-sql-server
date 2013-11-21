var redirect_repository = require('./../repositories/redirect_repository')
	, common = require('./../common/common')

module.exports.getResource = getResource

function getResource() {
	return new RedirectResource();
}

function RedirectResource() {}

RedirectResource.prototype.getRedirect = function(request, response) {	
	var responseHandler = common.createResponseHandler(response)

	var redirectRepository = new redirect_repository.RedirectRepository();
	var id = request.params.id;

	redirectRepository.get(id, responseHandler);
}

RedirectResource.prototype.getRedirect.name=

RedirectResource.prototype.getAllRedirects = function(request, response) {
	var responseHandler = common.createResponseHandler(response)

	var redirectRepository = new redirect_repository.RedirectRepository();
	redirectRepository.getAll(responseHandler);
}

