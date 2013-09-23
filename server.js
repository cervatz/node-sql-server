var express = require('express')
  , http = require('http')
  , path = require('path')
  , reload = require('reload')
  , colors = require('colors')
  , ClickoutModule = require('./server/modules/clickout_module')

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

// this is useless
app.get('/', function(req, res) {
  res.sendfile(path.join(clientDir, 'index.html'))
})

app.get('/api/clickout/:id', read)

var server = http.createServer(app)

// function ClickoutRepository()  {};

// ClickoutRepository.prototype.get = function(id) {
//   console.log("ClickoutRepository.prototype.get " + id);
// }

var clickoutRepository =  new ClickoutModule.ClickoutRepository();

reload(server, app)

function read (request, response) {
  console.log("enrico");
  var id = request.params.id;

  clickoutRepository.get(id);

  response.json({key: "value"});
}

server.listen(app.get('port'), function(){
  console.log("Web server listening in %s on port %d", colors.red(process.env.NODE_ENV), app.get('port'));
});


