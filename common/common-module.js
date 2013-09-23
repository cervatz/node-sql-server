module.exports.CommonUtils = CommonUtils;

function CommonUtils() {};

CommonUtils.prototype.getEnvironment = function(processArgsArray) {
	var environmentParam = processArgsArray[2];
	return environmentParam || 'development';
}
