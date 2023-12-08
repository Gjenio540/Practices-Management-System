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

export async function getStudents(id: number) {
  const connection = mysql2.createConnection(credentials).promise();
  const result = await connection.query<RowDataPacket[]>(`SELECT students.id, students.firstname, students.lastname, students.indexNum, students.studGroup, students.specialty, areas.areaName 
  FROM students 
  INNER JOIN areas on students.areaId = areas.id
  INNER JOIN supervisors on areas.supervisorId = supervisors.id
  WHERE supervisors.userId = ?
  ;`, [id]);
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
  const result = await connection.query<OkPacket>('INSERT INTO users (`username`, `userPassword`, `userRole`) VALUES (?, ?, ?)', [username, password, role]);
  connection.end();
  return result[0];
}

export async function insertStudent(firstname: string, lastname: string, index: string, areaId: number, studGroup: string, userId: number) {
  const connection = mysql2.createConnection(credentials).promise();
  const result = await connection.query<OkPacket>(
    'INSERT INTO students (`firstname`, `lastname`, `indexNum`, `studGroup`, `areaId`, `userId`) VALUES (?, ?, ?, ?, ?, ?);',[firstname, lastname, index, studGroup, areaId, userId]
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
  SELECT students.firstname, students.lastname, students.studGroup, students.indexNum, practices.id as practiceId, practices.companyName, practices.companyAdress, practices.practiceStatus, practices.semesterNumber, practices.startDate, practices.endDate, practices.numOfHours, practices.typeOfpractice, practices.nip, practices.regon, areas.areaName, statuses.statusName, supervisors.firstname as supervisorName, supervisors.lastname as supervisorsLastname
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

export async function getLogs(id: number) {
  const connection = mysql2.createConnection(credentials).promise();
  const result = await connection.query<RowDataPacket[]>('Select * FROM logs WHERE practiceId = ?', [id]);
  connection.end();
  if (Array.isArray(result[0]) && result[0].length > 0) {
    return result[0];
  }
  return "notfound";
}

export async function insertLog(id: number, message: string, logDate: string) {
  const connection = mysql2.createConnection(credentials).promise();
  const result = await connection.query<OkPacket>('INSERT INTO logs (practiceId, logMsg, logDate) values (?, ?, ?)', [id, message, logDate]);
  connection.end();
  return result[0];
}

export async function getAllStatuses() {
  const connection = mysql2.createConnection(credentials).promise();
  const result = await connection.query<RowDataPacket[]>('SELECT * FROM statuses');
  connection.end();
  if (Array.isArray(result[0]) && result[0].length > 0) {
    return result[0];
  }
  return "notfound";
}

export async function updateStatus(practiceStatus: number, practiceId: number) {
  const connection = mysql2.createConnection(credentials).promise();
  const result = await connection.query<OkPacket>('UPDATE practices SET practiceStatus = ? WHERE id = ?;', [practiceStatus, practiceId]);
  connection.end();
  return result[0];
}

export async function updatePassword(id: number, password: string) {
  const connection = mysql2.createConnection(credentials).promise();
  const result = await connection.query<OkPacket>('UPDATE users SET userPassword = ? WHERE id = ?;', [password, id]);
  connection.end();
  return result[0];
}

export async function insertPractice(id: number, type: string, companyName: string, companyAdress: string, nip: string, regon: string, practiceStatus: number, semesterNumber: number, startDate: string, endDate: string, numOfHours: number) {
  const connection = mysql2.createConnection(credentials).promise();
  const result = await connection.query<OkPacket>('INSERT INTO practices (studentId, typeOfpractice, companyName, companyAdress, nip, regon, practiceStatus, semesterNumber, startDate, endDate, numOfHours) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', [id, type, companyName, companyAdress, nip, regon, practiceStatus, semesterNumber, startDate, endDate, numOfHours]);
  connection.end();
  return result[0];
}

export async function getAreas(id: number) {
  const connection = mysql2.createConnection(credentials).promise();
  const result = await connection.query<RowDataPacket[]>(`SELECT areas.id, areas.areaName 
  FROM areas 
  INNER JOIN supervisors ON areas.supervisorId = supervisors.id
  INNER JOIN users ON supervisors.userId = users.id
  WHERE users.id = ?;`, [id]);
  connection.end();
  if (Array.isArray(result[0]) && result[0].length > 0) {
    return result[0];
  }
  // return "notfound";
}

export async function updateStudent(id: number, firstname: string, lastname: string, indexNum: string, studGroup: string, specialty: string, areaId: number) {
  const connection = mysql2.createConnection(credentials).promise();
  const result = await connection.query<OkPacket[]>('UPDATE students SET firstname = ?, lastname = ?, indexNum = ?, studGroup = ?, specialty = ?, areaId = ? WHERE id = ?', [firstname, lastname, indexNum, studGroup, specialty, areaId, id]);
  connection.end();
  return result[0];
}

export async function deletePractice(id: number) {
  const connection = mysql2.createConnection(credentials).promise();
  const result = await connection.query<OkPacket[]>('DELETE FROM practices WHERE studentId = ?;', [id]);
  connection.end();
  return result[0];
}

export async function deleteStudent(id: number) {
  const connection = mysql2.createConnection(credentials).promise();
  const result = await connection.query<OkPacket[]>('DELETE FROM students WHERE id = ?;', [id]);
  connection.end();
  return result[0];
}

