import mysql2, { OkPacket, RowDataPacket } from 'mysql2'
import * as dotenv from 'dotenv'

dotenv.config()

const credentials: mysql2.ConnectionOptions = {
  host:  process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT as unknown as number,
  database: process.env.DB_DATABASE
};

export async function getStudents() {
  const connection = mysql2.createConnection(credentials).promise();
  const result = await connection.query('SELECT * FROM student');
  connection.end();
  return result[0];
}

export async function searchUser(username: string, password: string) {
  const connection = mysql2.createConnection(credentials).promise();
  const result = await connection.query<RowDataPacket[]>('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
  connection.end();

  if (Array.isArray(result[0]) && result[0].length > 0) {
    return result[0][0];
  }

  return "notfound";
}

export async function insertUser(username: string, password: string, role: string) {
  const connection = mysql2.createConnection(credentials).promise();
  const result = await connection.query<OkPacket>('INSERT INTO `users` (`username`, `password`, `role`) VALUES (?, ?, ?)', [username, password, role]);
  return result[0];
}

export async function insertStudent(name: string, lastname: string, index: string, areaId: number, group: string, userId: number) {
  const connection = mysql2.createConnection(credentials).promise();
  const result = await connection.query<OkPacket>(
    'INSERT INTO `users` (`name`, `lastname`, `index`, `areaId`, group, userId) VALUES (?, ?, ?, ?, ?, ?)',[name, lastname, index, areaId, group, userId]
  );
  return result[0];
}