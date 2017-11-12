"use strict";
import express from 'express';
import bodyParser from 'body-parser';
import multiparty from 'connect-multiparty';
import jsonwebtoken from 'jsonwebtoken';
import routes from './routes';
import database from './config/database';

const app = express();
const configureExpress = () => {
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.json());
  app.use(multiparty());
  // filter always before routers
  app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
      res.setHeader("Access-Control-Allow-Headers", "content-type");
      res.setHeader("Access-Control-Allow-Credentials", true);
      if (req.headers && req.headers.authorization) {
        jsonwebtoken.verify(req.headers.authorization, 'RESTFULAPIs', (err, decode) => {
          if (err) req.user = undefined;
          req.user = decode;
          next();
        });
      } else {
        req.user = undefined;
        next();
      }
  });
  // routers
  app.use('/', routes);

  return app;
};


export default () => database.connect().then(configureExpress);
