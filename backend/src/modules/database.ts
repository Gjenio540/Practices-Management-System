import mysql2 from 'mysql2'
import * as dotenv from 'dotenv'

dotenv.config()

const credentials = {
  host:  process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT as unknown as number,
  database: process.env.DB_DATABASE
};

export async function getStudents() {
  const connection = mysql2.createConnection(credentials).promise();
  const results = await connection.query('SELECT * FROM student');
  connection.end();
  return results[0];
}
