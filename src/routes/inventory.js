import InventoryService from '../service/inventory';

class Inventory {

  static insertRoutes(app, dbCon) {

    app.post('/inventory/create', function(req, res) {
      var inventory = { 'name': req.query.name, 'quality': req.query.quality, 'description': req.query.description, 'unit': req.query.unit };
      InventoryService.insert(dbCon, inventory, function(err, result) {
        if (err) res.send('Something went wrong', 500);
        console.log('Last insert ID:', result.insertId);
        res.send('Item added successfully ' + `Item ID is ${result.insertId}`);
      });
    });


    app.post('/inventory/delete/:id', function(req, res) {
      console.log(req.params.id);
      var data = req.params.id;
      InventoryService.delete(dbCon, data, function(err, result) {
        if (err) res.send('Something went wrong', 500);
        console.log('Deleted ' + result.affectedRows + ' rows');
        res.send('Item deleted successfuly');
      });
    });


    app.post('/inventory/update/:id', function(req, res) {
      dbCon.query(
        'UPDATE product_master SET name = ?,quality= ?, description=?, unit= ? Where id = ?', [req.query.name, req.query.quality, req.query.description, req.query.unit, req.params.id],
        function(err, result) {
          if (err) throw err;
          console.log('Changed ' + result.changedRows + ' rows');
          res.send('Item updated sucessfully ' + result.changedRows);
        }
      );
    });

    app.get('/inventory', function(req, res) {
      //res.send('ok gete');
      dbCon.query('SELECT * FROM product_master', function(err, rows) {
        if (err) throw err;
        console.log('Data received from Db:\n');
        console.log(rows);
        res.send(rows);
      });
    });
  }

}

export default Inventory;
