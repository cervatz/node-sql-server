var express = require('express')
  , http = require('http')
  , path = require('path')
  , reload = require('reload')
  , colors = require('colors')
  , CommonModule = require('./common/common-module')
  , ClickoutRepositoryModule = require('./server/repositories/clickout-repository-module')

var commonUtils = new CommonModule.CommonUtils(); 
var environment = commonUtils.getEnvironment(process.argv)
  , config = require('./config/' + environment + '.properties.json')

console.log("using environment=" + environment);

var app = express()

var clientDir = path.join(__dirname, 'client')

app.configure(function() {
  app.set('port', 3000)
  app.use(express.favicon())
  app.use(express.logger('dev'))
  app.use(express.bodyParser()) 
  app.use(app.router) 
  app.use(express.static(clientDir)) 
})

app.configure('development', function(){
  app.use(express.errorHandler());
})

// app.get('/api/clickout/:id', getClickout)
app.get('/api/clickout/', getAllClickouts)


var server = http.createServer(app)

var clickoutRepository;

reload(server, app)

var initRepository = function(config, response) {
  clickoutRepository =  new ClickoutRepositoryModule.ClickoutRepository(config);
}

// function getClickout (request, response) {
//   initRepository(response);
//   var id = request.params.id;

//   var sendResponse = function(results, connection) {
//     connection.end()
//     response.json(results)    
//   }

//   clickoutRepository.getAll(id, sendResponse);
// }

function buildCallBack(repository, response) {
  var callBack = function(results) {
    repository.closeConnection()
    response.json(results)
  }
  return callBack;
}

function getAllClickouts (request, response) {
  initRepository(config, response);

  var callBack = buildCallBack(clickoutRepository, response);

  clickoutRepository.getAll(callBack);
}

server.listen(app.get('port'), function(){
  console.log("Web server listening in %s on port %d", colors.red(process.env.NODE_ENV), app.get('port'));
});


