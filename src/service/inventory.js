import DBQuery from '../utils/DBQuery';

class Inventory {
  constructor() {
    this.table = 'product_master';
  }
  insert(dbCon, data, callback) {
    DBQuery.insert(dbCon, this.table, data, callback);
  }
  delete(dbCon, data, callback) {
    DBQuery.delete(dbCon, this.table,'item_id', data, callback);
  }
}

export default Inventory;
