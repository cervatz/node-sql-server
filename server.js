var express = require('express')
  , http = require('http')
  , path = require('path')
  , cluster = require('cluster')
  , colors = require('colors')
  , common = require('./server/common/common')
  , commonUtils = new common.CommonUtils()
  , redirect_resource = require('./server/resources/redirect_resource')

GLOBAL.environment = commonUtils.getEnvironment(process.argv[2])
GLOBAL.config = require('./config/' + environment + '.properties.json')

console.log("using environment " + GLOBAL.environment)

var redirectResource = redirect_resource.getResource()

var app = express()

var clientDir = path.join(__dirname, 'client')

app.configure(function() {
  app.set('port', 3000)
  app.use(express.favicon())
  app.use(express.logger('dev'))
  app.use(express.urlencoded()) 
  app.use(express.json())
  app.use(app.router) 
  app.use(express.static(clientDir)) 
})

app.configure('development', function(){
  app.use(express.errorHandler());
})

app.get('/redirects', redirectResource.getAllRedirects)
app.get('/redirects/:id', redirectResource.getRedirect)


if (cluster.isMaster) {
  var cpuCount = require('os').cpus().length;
  // Create a worker for each CPU
  for (var i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }
} else {
    var server = http.createServer(app)

    server.listen(app.get('port'), function(){
      console.log("Started new worker process listening in %s on port %d", colors.red(process.env.NODE_ENV), app.get('port'));
    });

}

