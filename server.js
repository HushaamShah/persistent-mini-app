let http = require('http');
let fs = require('fs');
http.createServer(function (req, res) {
    console.log('Server Running')
    if (req.url == '/') {
        serveFiles('/index.html', res)
    }
    if (req.url == '/script.js') {
        serveFiles(req.url, res)
    }
    if (req.url == '/test') {
        console.log('test')
    }

}).listen(8080);

function serveFiles(filePath, res) {
    fs.readFile(`.${filePath}`, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data)
            res.end()
        }
    })
}