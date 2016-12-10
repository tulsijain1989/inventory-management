import mysql from 'mysql';

const dbConnection = () => {
  // First you need to create a connection to the db
  var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'billing_software'
  });

  con.connect(function(err) {
    if (err) {
      console.log('Error connecting to Db');
      return;
    }
    console.log('Connection established');
  });

  /*con.end(function(err) {
    console.log(err);
    // The connection is terminated gracefully
    // Ensures all previously enqueued queries are still
    // before sending a COM_QUIT packet to the MySQL server.
  });*/
  return con;
};

export default dbConnection;
