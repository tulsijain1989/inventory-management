import express from 'express';
import dbConnection from '../sp-node-mysql/app.js';
/* eslint-disable no-console */

const port = 3000;
const app = express();
const dbCon = dbConnection();



app.post('/inventory/create', function(req, res) {
  var inventory = { 'name': req.query.name, 'quality': req.query.quality, 'description': req.query.description, 'unit': req.query.unit };
  dbCon.query('INSERT INTO product_master SET ?', inventory, function(err, result) {
    if (err) throw err;
    console.log('Last insert ID:', result.insertId);
    res.send('Item added successfully ' + `Item ID is ${result.insertId}`);
  });
});


app.post('/inventory/delete/:id', function(req, res) {
  console.log(req.params.id);
  dbCon.query(
    'DELETE FROM product_master WHERE id = ?', [req.params.id],
    function(err, result) {
      if (err) throw err;

      console.log('Deleted ' + result.affectedRows + ' rows');
      res.send('Item deleted successfuly');
    });
});


app.post('/inventory/update/:id', function(req, res) {
  dbCon.query(
    'UPDATE product_master SET name = ?,quality= ?, description=?, unit= ? Where id = ?',
     [req.query.name,req.query.quality,req.query.description,req.query.unit,req.params.id],
    function(err, result) {
      if (err) throw err;
      console.log('Changed ' + result.changedRows + ' rows');
      res.send('Item updated sucessfully '+result.changedRows);
    }
  );
});

app.get('/inventory/list', function(req, res) {
  //res.send('ok gete');
  dbCon.query('SELECT * FROM product_master', function(err, rows) {
    if (err) throw err;
    console.log('Data received from Db:\n');
    console.log(rows);
    res.send(rows);
  });
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server listening on port: ${port}`);
  }
});
