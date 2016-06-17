function urlToPath(url) {
  var path = require("url").parse(url).pathname;
  var uri = decodeURIComponent(path);
  return "." + uri.replace(/\.\./g,".");
}



console.log("http://localhost:8000/../.config/config/google-chrome/Default/Web%20Data");
console.log(urlToPath("http://localhost:8000/../.config/config/google-chrome/Default/Web%20Data"));
console.log("=====");

console.log("http://localhost:8000/../.ssh/id_dsa");
console.log(urlToPath("http://localhost:8000/../.ssh/id_dsa"));
console.log("=====");

console.log("http://localhost:8000/../../../etc/passwd");
console.log(urlToPath("http://localhost:8000/../../../etc/passwd"));
console.log("=====");


