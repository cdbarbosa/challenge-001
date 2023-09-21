import http from 'node:http';

http
  .createServer(function (req, res) {
    res.write('hello world');
    res.end();
  })
  .listen(3333);
