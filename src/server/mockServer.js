// @flow

import jsonServer from 'json-server';
import path from 'path';
import fs from 'fs';
import {createData} from './db.js';
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import bodyParser from 'body-parser';
import listEndpoints from 'express-list-endpoints';

const server = jsonServer.create();
const database = JSON.stringify(createData());
const dbPath = path.join(__dirname, 'db.json');
fs.writeFileSync(dbPath, database);
const router = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults({ bodyParser: true, logger: true });

const adapter = new FileSync(dbPath);
const db = low(adapter);
server.set('db', db);
server.use((req, res, next) => {
  res.db = db;
  next();
});
const port = process.env.NODE_PORT || 8080;
// To handle POST, PUT and PATCH you need to use a body-parser You can use the
// one used by JSON Server
server.use(jsonServer.bodyParser);
// Add an additional body parser for non json types
server.use(bodyParser.urlencoded({ extended: true }));
// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

server.use(router);

server.get('/quit', (req,res) => {
  res.send('closing..');
  server.close();
});

server.get('/start', (req, res) => {
  server.listen(port, () => {
    const endpoints = listEndpoints(server).map(endpoint => {
      endpoint.path = `http://localhost:${port}${endpoint.path}`;
      return endpoint;
    });
    res.send({endpoints, port});
  });
});

try {
  if (!process.env.NO_SERVER) {
    server.listen(port, () => {
      const endpoints = listEndpoints(server).map(endpoint => {
        endpoint.path = `http://localhost:${port}${endpoint.path}`;
        return endpoint;
      });
      console.log(endpoints);
      console.log(`JSON Server is running on port ${port}`);
    });
  }
} catch (err) {
  console.error('The server is already running', err);
}

export {server};
