import http from 'http';
import fs from 'fs';
import { WebSocketServer } from 'ws';
import { DatabaseSync } from 'node:sqlite';



const middlewares = [
    (req, res, next) => {
        let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            req.body = body ? JSON.parse(body) : {};
            next();
        })
    }
];

const server = http.createServer(function (req, res) {
    let index = 0;

    function next() {
        if (index < middlewares.length) {
            const middleware = middlewares[index++];
            middleware(req, res, next);
        } else {
            console.log('Server Running')
            console.log(req.url)
            if (req.url == '/') {
                serveFiles('/index.html', res)
            }
            if (req.url == '/script.js') {
                serveFiles(req.url, res)
            }
            if (req.url == '/test') {
                console.log('test')
            }
            if (req.url == '/test') {
                console.log('test')
            }
        }
    }

    next();

}).listen(8080);;

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



const wss = new WebSocketServer({ server });

wss.on('error', function logError(error) {
    console.log('ERROR!!!!!!!')
    console.error(error)
});

// ws.on('open', function open() {
//   ws.send('something');
// });

// wss.on('connection', (ws, req) => {
//     ws.on('message', (message) => {
//         console.log(message)
//         // ws.send(JSON.stringify(JSON.parse(message)))
//         broadcastToAll({ text: `Someone said: ${message}` });
//     })

//     console.log('connection')
// });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    wss.clients.forEach((client) => {
      // Check that the client is open AND is not the original sender
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(`${message}`);
      }
    });
  });
});

function broadcastToAll(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

// ws.on('message', function message(data) {
//   console.log('received: %s', data);
// });







const database = new DatabaseSync('./appDB');
const query = database.prepare('SELECT * FROM data');
// Execute the prepared statement and log the result set.
console.log(query.all());
