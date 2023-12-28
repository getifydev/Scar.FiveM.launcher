import * as mysql from 'mysql';

// Read database configuration from a JSON settings file
const settings = require('./Database.json');

// Database configuration
const dbConfig: mysql.ConnectionConfig = {
  host: settings.database.host,
  user: settings.database.user,
  password: settings.database.password,
  database: settings.database.name,
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Function to execute a SQL query
export const executeQuery = (query: string, params?: any[]): Promise<any> => {
  return new Promise((resolve, reject) => {
    pool.getConnection((error, connection) => {
      if (error) {
        reject(error);
      } else {
        connection.query(query, params, (queryError, results) => {
          connection.release(); // Release the connection back to the pool

          if (queryError) {
            reject(queryError);
          } else {
            resolve(results);
          }
        });
      }
    });
  });
};
