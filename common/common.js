module.exports.CommonUtils = CommonUtils;

function CommonUtils() {};

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
