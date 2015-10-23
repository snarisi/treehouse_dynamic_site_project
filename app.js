var http = require('http');
var router = require('./router');

http.createServer(function(request, response) {
  router.home(request, response);
  router.profile(request, response);
  router.static(request, response);
}).listen(8000, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8000')

