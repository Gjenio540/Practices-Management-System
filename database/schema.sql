CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT, 
    username VARCHAR(20) NOT NULL,
    userPassword VARCHAR(100) NOT NULL,
    userRole VARCHAR(10) NOT NULL,
    UNIQUE(username),
    PRIMARY KEY(id)
);

CREATE TABLE supervisors (
    id INT NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(20) NOT NULL,
    lastname VARCHAR(20) NOT NULL,
    email VARCHAR(50) NOT NULL,
    userId INT NOT NULL,
    UNIQUE(id),
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE areas (
    id INT NOT NULL AUTO_INCREMENT,
    areaName VARCHAR(50),
    supervisorId INT NOT NULL,
    UNIQUE(id),
    PRIMARY KEY (id),
    FOREIGN KEY (supervisorId) REFERENCES supervisors(id)
);

CREATE TABLE students (
    id INT NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(20),
    lastname VARCHAR(20),
    indexNum VARCHAR(6),
    studGroup VARCHAR(20),
    specialty VARCHAR(50),	
    areaId INT,
    userId INT,
    UNIQUE(id, indexNum),
    PRIMARY KEY (id),
    FOREIGN KEY (areaId) REFERENCES areas(id),
    FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE statuses (
    id int NOT NULL AUTO_INCREMENT,
    statusName VARCHAR(100) NOT NULL,
    UNIQUE(id),
    PRIMARY KEY (id)
);

CREATE TABLE practices (
    id int NOT NULL AUTO_INCREMENT,
    studentId int NOT NULL,
    typeOfpractice VARCHAR(50),
    companyName VARCHAR(100),
    companyAdress VARCHAR(100),
    nip VARCHAR(11),
    regon VARCHAR(9),
    practiceStatus INT,
    semesterNumber INT,
    startDate DATE,
    endDate DATE,
    numOfHours INT,
    UNIQUE(id),
    PRIMARY KEY (id),
    FOREIGN KEY (studentId) REFERENCES students(id),
    FOREIGN KEY (practiceStatus) REFERENCES statuses(id)
);

CREATE TABLE logs (
    id int NOT NULL AUTO_INCREMENT,
    practiceId int NOT NULL,
    logDate date NOT NULL,
    logMsg VARCHAR(100) NOT NULL,
    UNIQUE(id),
    PRIMARY KEY (id),
    FOREIGN KEY (practiceId) REFERENCES practices(id)
);