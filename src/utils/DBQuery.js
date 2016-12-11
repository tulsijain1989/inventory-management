class DBQuery {
  constructor() {}
  insert(dbCon, table, data, callback) {
    dbCon.query(`INSERT INTO ${table} SET ?`, data, callback);
  }
  delete(dbCon, table,deleteby, data, callback) {
    dbCon.query('DELETE FROM ${table} WHERE ${deleteby} = ?', data, callback);
  }
}

export default DBQuery;
