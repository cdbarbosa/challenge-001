import { Database } from "./database/database.js"
import { randomUUID } from "node:crypto";

const database = new Database();

export const routes = [
  {
    method: 'GET',
    path: '/tasks',
    handler: (_, res) => {
      const tasks = database.list('tasks');

      return res.end(JSON.stringify(tasks));
    }
  },
  {
    method: 'POST',
    path: '/tasks',
    handler: (req, res) => {
      const { title, description} = req.body;
      const task = {
        id: randomUUID(),
        title,
        description,
        createdAt: new Date().toISOString(),
      }

      database.create('tasks', task);

      return res.writeHead(201).end();
    }
  }
]