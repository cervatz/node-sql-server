var CommonModule = require('./../../common/common-module')
	, commonUtils = new CommonModule.CommonUtils()
	, ClickoutRepositoryModule = require('./../../server/repositories/clickout-repository-module')

module.exports.getRedirect = getRedirect
module.exports.getAllRedirects = getAllRedirects

var clickoutRepository

function getRedirect(request, response) {
  initRepository();
  var id = request.params.id;

  var callBack = commonUtils.buildCallBack(clickoutRepository, response);

  clickoutRepository.get(id, callBack);
}

function getAllRedirects(request, response) {
  initRepository();

  var callBack = commonUtils.buildCallBack(clickoutRepository, response);

  clickoutRepository.getAll(callBack);
}


var initRepository = function() {
  clickoutRepository =  new ClickoutRepositoryModule.ClickoutRepository();
}
