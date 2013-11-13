var express = require('express')
  , http = require('http')
  , path = require('path')
  , reload = require('reload')
  , colors = require('colors')
  , CommonModule = require('./common/common-module')
  , commonUtils = new CommonModule.CommonUtils()
  , ClickoutResourceModule = require('./server/resources/clickout-resource-module')
  , ClickoutRepositoryModule = require('./server/repositories/clickout-repository-module')

GLOBAL.environment = commonUtils.getEnvironment(process.argv[2]);
GLOBAL.config = require('./config/' + environment + '.properties.json')

console.log("using environment " + GLOBAL.environment);

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

app.get('/api/clickouts', ClickoutResourceModule.getAllClickouts)
app.get('/api/clickouts/:id', ClickoutResourceModule.getClickout)

var server = http.createServer(app)

reload(server, app)

server.listen(app.get('port'), function(){
  console.log("Web server listening in %s on port %d", colors.red(process.env.NODE_ENV), app.get('port'));
});


