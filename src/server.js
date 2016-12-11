import express from 'express';
import bodyParser from 'body-parser';

import dbConnection from '../sp-node-mysql/app.js';
import Inventory from './routes/inventory';
/* eslint-disable no-console */

const port = 3000;
const app = express();
const dbCon = dbConnection();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

Inventory.insertRoutes(app, dbCon);

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server listening on port: ${port}`);
  }
});
