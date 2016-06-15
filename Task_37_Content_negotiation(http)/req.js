var headersType = ["application/json", "text/html", "text/plain"];
var http = require("http");

function readStreamAsString(stream, callback) {
  var content = "";
  stream.on("data", function(chunk) {
    content += chunk;
  });
  stream.on("end", function() {
    callback(null, content);
  });
  stream.on("error", function(error) {
    callback(error);
  });
}

headersType.forEach(function(header) {
  var options = {
    hostname: "eloquentjavascript.net",
    path: "/author",
    method: "GET",
    headers: {Accept: header}
  };

  var request = http.request(options, function(response) {
    readStreamAsString(response, function(error, content) {
      console.log(content);
    }) //readStreamAsString
  }); //var request 
  request.end();
}); //headersType.forEach
