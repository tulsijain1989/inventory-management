import dbConnection from '../sp-node-mysql/app.js';
const dbCon = dbConnection();


//get all item
ItemProvider.getList = function(callback) {
  //res.send('ok gete');
  dbCon.query('SELECT * FROM product_master', function(err, rows) {
    if (err) throw err;
    console.log('Data received from Db:\n');
    console.log(rows);
    callback(null, rows);
  });
};

//update item by ID
ItemProvider.findById = function(req, callback) {
  dbCon.query(
    'UPDATE product_master SET name = ?,quality= ?, description=?, unit= ? Where id = ?', [req.query.name, req.query.quality, req.query.description, req.query.unit, req.params.id],
    function(err, result) {
      if (err) throw err;
      console.log('Changed ' + result.changedRows + ' rows');
      callback(null, result.changedRows);
    }
  );
};


//save new item
ItemProvider.prototype.save = function(req, callback) {
  var inventory = { 'name': req.query.name, 'quality': req.query.quality, 'description': req.query.description, 'unit': req.query.unit };
  dbCon.query('INSERT INTO product_master SET ?', inventory, function(err, result) {
    if (err) throw err;
    console.log('Last insert ID:', result.insertId);
    callback('Item added successfully ' + `Item ID is ${result.insertId}`);
  });
};

/*// update an employee
ItemProvider.prototype.update = function(employeeId, employees, callback) {
  this.getCollection(function(error, employee_collection) {
    if (error) callback(error);
    else {
      employee_collection.update({ _id: employee_collection.db.bson_serializer.ObjectID.createFromHexString(employeeId) },
        employees,
        function(error, employees) {
          if (error) callback(error);
          else callback(null, employees)
        });
    }
  });
};*/

//delete employee
ItemProvider.delete = function(req, callback) {
  console.log(req.params.id);
  dbCon.query(
    'DELETE FROM product_master WHERE id = ?', [req.params.id],
    function(err, result) {
      if (err) throw err;

      console.log('Deleted ' + result.affectedRows + ' rows');
      callback('Item deleted successfuly');
    });
};

exports.ItemProvider = ItemProvider;
