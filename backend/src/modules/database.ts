import mysql2 from 'mysql2'
import * as dotenv from 'dotenv'

dotenv.config()

const connection = mysql2.createPool({
    host:  process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT as unknown as number,
    database: process.env.DB_DATABASE
  }).promise()

export async function getStudents()
{
  const results = await connection.query('SELECT * FROM student')
  return results[0]
}
