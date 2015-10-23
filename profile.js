var https = require('https');
var http = require('http');
var EventEmitter = require('events').EventEmitter;
var util = require('util');

//get profile data and return JSON
function Profile(username) {
  
  EventEmitter.call(this);
  profileEmitter = this;
  var url = 'https://teamtreehouse.com/' + username + '.json';
  var request = https.get(url, function(response) {
    var body = '';
    
    if (response.statusCode !== 200) {
      request.abort();
      profileEmitter.emit('error', new Error('Error getting profile for ' + username + '. (' + http.STATUS_CODES[response.statusCode] + ')\n'));
    }
    
    response.on('data', function(chunk) {
      body += chunk;
      profileEmitter.emit('data', chunk);
    });
    
    response.on('end', function() {
      if (response.statusCode === 200) {
        try {
          body = JSON.parse(body);
          profileEmitter.emit('end', body);
        } catch(error) {
          profileEmitter.emit('error', error);
        }
      }
    }).on('error', function(error) {
      profileEmitter.emit('error', error);
    });
  });
}

util.inherits(Profile, EventEmitter );
module.exports = Profile;
