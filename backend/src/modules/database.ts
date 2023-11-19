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
  const result = await connection.query<RowDataPacket[]>('SELECT students.firstname, students.lastname, students.indexNum, students.studGroup, areas.areaName FROM students INNER JOIN areas on students.areaId = areas.id;');
  connection.end();
  return result[0];
}

export async function searchUser(username: string) {
  const connection = mysql2.createConnection(credentials).promise();
  const result = await connection.query<RowDataPacket[]>('SELECT * FROM users WHERE username = ?', [username]);
  connection.end();

  if (Array.isArray(result[0]) && result[0].length > 0) {
    return result[0][0];
  }

  return "notfound";
}

export async function insertUser(username: string, password: string, role: string) {
  const connection = mysql2.createConnection(credentials).promise();
  const result = await connection.query<OkPacket>('INSERT INTO `users` (`username`, `password`, `role`) VALUES (?, ?, ?)', [username, password, role]);
  connection.end();
  return result[0];
}

export async function insertStudent(name: string, lastname: string, index: string, areaId: number, group: string, userId: number) {
  const connection = mysql2.createConnection(credentials).promise();
  const result = await connection.query<OkPacket>(
    'INSERT INTO `users` (`name`, `lastname`, `index`, `areaId`, group, userId) VALUES (?, ?, ?, ?, ?, ?);',[name, lastname, index, areaId, group, userId]
  );
  connection.end();
  return result[0];
}

export async function getSupervisor(id: number) {
  const connection = mysql2.createConnection(credentials).promise();
  const result = await connection.query<RowDataPacket[]>('SELECT * FROM supervisors WHERE userId = ?',[id]);
  connection.end();
  return result[0][0];
}

export async function getMyPractice(id: number) {
  const connection = mysql2.createConnection(credentials).promise();
  const result = await connection.query<RowDataPacket[]>(`
  SELECT students.firstname, students.lastname, students.studGroup, students.indexNum, practices.companyName, practices.companyAdress, practices.practiceStatus, practices.semesterNumber, practices.startDate, practices.endDate, practices.numOfHours, areas.areaName, supervisors.firstname as supervisorName, supervisors.lastname as supervisorsLastname
  FROM students
  INNER JOIN areas ON students.areaId = areas.id
  INNER JOIN practices ON students.id = practices.studentId
  INNER JOIN statuses ON practices.practiceStatus = statuses.id
  INNER JOIN supervisors ON areas.supervisorId = supervisors.id
  WHERE students.userId = ?;
  `, [id]);
  connection.end();
  if (Array.isArray(result[0]) && result[0].length > 0) {
    return result[0][0];
  }
  return "notfound";
}

export async function getAllPractices(id: number) {
  const connection = mysql2.createConnection(credentials).promise();
  const result = await connection.query<RowDataPacket[]>(`
    SELECT students.firstname, students.lastname, students.indexNum, students.studGroup, areas.areaName, statuses.statusName, practices.id FROM students
    INNER JOIN areas ON students.areaId = areas.id
    INNER JOIN practices ON students.id = practices.studentId
    INNER JOIN statuses ON practices.practiceStatus = statuses.id
    INNER JOIN supervisors ON areas.supervisorId = supervisors.id
    INNER JOIN users ON supervisors.userId = users.id WHERE users.id = ?;
  `, [id]);
  connection.end();
  if (Array.isArray(result[0]) && result[0].length > 0) {
    return result[0];
  }
  return "notfound";
}

export async function getPractice(id: number) {
  const connection = mysql2.createConnection(credentials).promise();
  const result = await connection.query<RowDataPacket[]>(`
  SELECT students.firstname, students.lastname, students.studGroup, students.indexNum, practices.id as practiceId, practices.companyName, practices.companyAdress, practices.practiceStatus, practices.semesterNumber, practices.startDate, practices.endDate, practices.numOfHours, practices.statusDate, areas.areaName, statuses.statusName, supervisors.firstname as supervisorName, supervisors.lastname as supervisorsLastname
  FROM students
  INNER JOIN areas ON students.areaId = areas.id
  INNER JOIN practices ON students.id = practices.studentId
  INNER JOIN statuses ON practices.practiceStatus = statuses.id
  INNER JOIN supervisors ON areas.supervisorId = supervisors.id
  WHERE practices.id = ?;
  `, [id]);
  connection.end();
  if (Array.isArray(result[0]) && result[0].length > 0) {
    return result[0][0];
  }
  return "notfound";
}

export async function getAllStatuses() {
  const connection = mysql2.createConnection(credentials).promise();
  const result = await connection.query<RowDataPacket[]>('SELECT * FROM statuses');
  connection.end();
  if (Array.isArray(result[0]) && result[0].length > 0) {
    return result[0];
  }
  // return "notfound";
}

export async function updateStatus(practiceStatus: number, practiceId: number) {
  const connection = mysql2.createConnection(credentials).promise();
  const result = await connection.query<OkPacket>('UPDATE practices SET practiceStatus = ? WHERE id = ?;', [practiceStatus, practiceId]);
  connection.end();
  return result[0];
}

export async function updatePassword(id: number, password: string) {
  const connection = mysql2.createConnection(credentials).promise();
  const result = await connection.query<OkPacket>('UPDATE users SET password = ? WHERE id = ?;', [password, id]);
  connection.end();
  return result[0];
}