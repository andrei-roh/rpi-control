
import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';
import { rootReducer } from './src/app/utils'

const httpServer = http.createServer(function (req, res) {
  if (req.url) {
    rootReducer(req.url);
  }

  const __dirname = path.resolve(path.dirname(''));
  const file_path = __dirname + (req.url === '/' ? '/index.html' : req.url);

  fs.readFile(file_path, function (err, data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
});

httpServer.listen(8181);
console.log(`Server started on ${8181} PORT`);
