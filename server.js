var express = require('express')
  , http = require('http')
  , path = require('path')
  , reload = require('reload')
  , colors = require('colors')
  , CommonModule = require('./common/common-module')
  , ClickoutModule = require('./server/modules/clickout-module')

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

app.get('/api/clickout/:id', read)
app.get('/api/test', test)

var server = http.createServer(app)

var clickoutRepository =  new ClickoutModule.ClickoutRepository(config);

reload(server, app)

var results = [];

function read (request, response) {
  var id = request.params.id;

  var sendResponseBack = function(results) {
    response.json(results)
  }

  clickoutRepository.get(id, results, sendResponseBack);  
}

function test(request, response) {
 response.json(results); 
}

server.listen(app.get('port'), function(){
  console.log("Web server listening in %s on port %d", colors.red(process.env.NODE_ENV), app.get('port'));
});


