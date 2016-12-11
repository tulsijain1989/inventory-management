import express from 'express';
import dbConnection from '../sp-node-mysql/app.js';
import Inventory from './routes/inventory';
/* eslint-disable no-console */

const port = 3000;
const app = express();
const dbCon = dbConnection();

Inventory.insertRoutes(app, dbCon);

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server listening on port: ${port}`);
  }
});
