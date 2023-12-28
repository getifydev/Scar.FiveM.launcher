import { executeQuery } from './database';

// Example usage
const query = 'SELECT * FROM your_table';
executeQuery(query)
  .then((results) => {
    console.log('Query results:', results);
  })
  .catch((error) => {
    console.error('Error executing query:', error);
  });
