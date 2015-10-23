var Profile = require('./profile');
var renderer = require('./renderer');
var querystring = require('querystring');

var commonHeaders = { 'Content-Type': 'text/html'}
function home(request, response) {
  if (request.url === '/') {
    if (request.method.toLowerCase() === 'get') {
      response.writeHead(200, commonHeaders);
      renderer.showPage('header', {}, response);
      renderer.showPage('search', {}, response);
      renderer.showPage('footer', {}, response);
      response.end();
    } else {
      request.on('data', function(postBody) {
        var query = querystring.parse(postBody.toString());
        response.writeHead(303, { 'location': '/' + query.username});
        response.end();
      });
    }
  }
}

function profile(request, response) {
  var username = request.url.replace('/', '');
  
  if (username.length > 0) {
    console.log(username);
    response.writeHead(200, commonHeaders);
    
    var userData = new Profile(username);
    
    userData.on('end', function(data) {
      var values = {
        avatarUrl: data.gravatar_url,
        username: data.profile_name,
        badges: data.badges.length,
        javascriptPoints: data.points.JavaScript
      }
      renderer.showPage('header', {}, response);
      renderer.showPage('profile', values, response);
      renderer.showPage('footer', {}, response);
      response.end();
    });
    
    
    userData.on('error', function(error) {
      response.write(error.message);
      response.end();
    });
    
  }
}

function static(request, response) {
  if (request.url.search('.css') !== -1) {
    response.writeHead(200, { 'Content-Type': 'text/css' })
    renderer.serveFile(request.url, response);
  }
}

module.exports.home = home;
module.exports.profile = profile;
module.exports.static = static;