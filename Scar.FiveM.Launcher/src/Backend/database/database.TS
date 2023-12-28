// Import necessary libraries
import * as mysql from 'mysql';

// Database configuration
const dbConfig: mysql.ConnectionConfig = {
  host: 'your_database_host',
  user: 'your_database_user',
  password: 'your_database_password',
  database: 'your_database_name',
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
