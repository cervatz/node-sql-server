var Sequelize = require('sequelize')

module.exports.RedirectRepository = RedirectRepository

function RedirectRepository() {
	this.sequelize = new Sequelize(GLOBAL.config.vcgConnection.database, GLOBAL.config.vcgConnection.username, GLOBAL.config.vcgConnection.password, {
		host: GLOBAL.config.vcgConnection.host,
		port: GLOBAL.config.vcgConnection.port,
		sync: { force: false }
	})

	this.RedirectProductUrl = this.sequelize.define('redirectproducturl', {
		redirectProductUrlId: {type: Sequelize.INTEGER, primaryKey: true},
		labelId: Sequelize.INTEGER,
		productId: Sequelize.INTEGER,
		source: Sequelize.TEXT,
		destination: Sequelize.TEXT,
		insertDate: Sequelize.DATE,
		updateDate: Sequelize.DATE
	})
}

RedirectRepository.prototype.get = function(id, responseHandler) {
	console.log("RedirectRepository.prototype.get " + id + " entering")

	this.RedirectProductUrl.find(id)
		.success(function (redirect) {
			responseHandler.emit('close', redirect)
		})
	.error(function(error){
		console.log("RedirectRepository.prototype.get " + id + " error:" + error)
	})

	console.log("RedirectRepository.prototype.get " + id + " leaving")
}


RedirectRepository.prototype.getAll = function(responseHandler) {
	console.log("RedirectRepository.prototype.getAll - entering")

	this.RedirectProductUrl.findAll()
		.success(function (redirects) {
			responseHandler.emit('close', redirects)
		})
	.error(function(error){
		console.log("RedirectRepository.prototype.getAll error:" + error)
	})

	console.log("RedirectRepository.prototype.getAll - leaving")
}

