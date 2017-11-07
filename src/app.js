"use strict";
import express from 'express';
import bodyParser from 'body-parser';
import multiparty from 'connect-multiparty';
import routes from './routes/site';
import database from './config/database'

const app = express();
const configureExpress = () => {
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.json());
  app.use(multiparty());
  app.use('/', routes);
  app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
      res.setHeader("Access-Control-Allow-Headers", "content-type");
      res.setHeader("Access-Control-Allow-Credentials", true);
      next();
  });

  return app
};


export default () => database.connect().then(configureExpress);
