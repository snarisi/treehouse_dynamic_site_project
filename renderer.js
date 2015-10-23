var fs = require('fs');

function showPage(pageName, values, response) {

  var page = fs.readFileSync('views/' + pageName + '.html').toString();
  for (var prop in values) {
    page = page.replace('{{' + prop + '}}', values[prop]);
  }
  response.write(page);
}

function serveFile(fileName, response) {
  fileName = fileName.replace('/', '');
  fs.readFile(fileName, function(err, file) {
    response.write(file);
  });
}

module.exports.showPage = showPage;
module.exports.serveFile = serveFile;