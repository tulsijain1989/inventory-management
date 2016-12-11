import InventoryService from '../service/inventory';

class Inventory {

  static insertRoutes(app, dbCon) {

    const service = new InventoryService();
    //create or add product item
    app.post('/product/create', function(req, res) {
      var inventory = { 'name': req.query.name, 'quality': req.query.quality, 'description': req.query.description, 'unit': req.query.unit };
      service.insert(dbCon, inventory, function(err, result) {
        if (err) res.send('Something went wrong', 500);
        console.log('Last insert ID:', result.insertId);
        res.send('Item added successfully ' + `Item ID is ${result.insertId}`);
      });
    });

    //delete product by id
    app.post('/product/delete/:id', function(req, res) {
      var data = req.params.id;
      service.deleteRow(dbCon, data, function(err, result) {
        if (err) res.send('Something went wrong', 500);
        console.log('Deleted ' + result.affectedRows + ' rows');
        res.send('Item deleted successfuly');
      });
    });

    //update product by id
    app.post('/product/update/:id', function(req, res) { 
      console.log(req.body)    
      var product={'item_id': req.params.id, 'name': req.body.name, 'quality': req.body.quality, 'description': req.body.description, 'unit': req.body.unit };
      service.update(dbCon, product, function(err, result) {
        if(err) res.send('Something went wrong', 500);
        console.log('Changed ' + result.changedRows + ' rows');
        res.send('Item updated sucessfully ' + result.changedRows);
      });
    });
    //get list of all products
    app.get('/product', function(req, res) {
      service.list(dbCon, function(err, result) {       
        if (err) res.send('Something went wrong', 500);
        console.log('Data received from Db:\n');
        console.log(result);
        res.send(result);
      });
    });
  }

}

export default Inventory;
