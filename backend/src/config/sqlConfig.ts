import dotenv from 'dotenv';
import * as sql from 'mssql'

dotenv.config();

export const sqlConfig = {
  user: process.env.DB_USER as string,
  password: process.env.DB_PWD as string,
  database: process.env.DB_NAME as string,
  server: 'localhost',
  pool: {
    max: 10,
    min: 0, 
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
}



// function testConnection() {
//     if(sqlConfig){
//       console.log('Database connected successfully');
      
//     }
//     else{
//       console.log('Database NOT connected');
      
//     }
// }
// testConnection();
