import http from 'node:http';
import { toJSON } from './middlewares/index.js';
import { routes } from './routes.js';

http
  .createServer(async (req, res) => {
    const { method, url } = req;

    await toJSON(req, res);

    const route = routes.find(rt => {
      return rt.method === method && rt.path === url;
    })

    if (route)
      return route.handler(req, res);

    return res.writeHead(404).end();
  })
  .listen(3333);