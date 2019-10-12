 const mysql = require('mysql2/promise');
 //¿Por que promise?
 module.exports.pool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'pwa',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0 //???
   });// query database

