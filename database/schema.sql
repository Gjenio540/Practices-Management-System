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
    fistname VARCHAR(20),
    lastname VARCHAR(20),
    email VARCHAR(50),
    userId INT,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE areas (
    id INT NOT NULL AUTO_INCREMENT,
    areaName VARCHAR(50),
    supervisorId INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (supervisorId) REFERENCES supervisors(id)
);

CREATE TABLE students (
    id INT NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(20),
    lastname VARCHAR(20),
    indexNum VARCHAR(6),
    studGroup VARCHAR(20),
    areaId INT,
    userId INT,
    UNIQUE(firstname, lastname, indexNum),
    PRIMARY KEY (id),
    FOREIGN KEY (areaId) REFERENCES areas(id),
    FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE statuses (
    id int NOT NULL AUTO_INCREMENT,
    statusName VARCHAR(100),
    PRIMARY KEY (id)
);

CREATE TABLE practices (
    id int NOT NULL AUTO_INCREMENT,
    studentId int,
    companyName VARCHAR(100),
    companyAdress VARCHAR(100),
    practiceStatus INT,
    semesterNumber INT,
    startDate DATE,
    endDate DATE,
    numOfHours INT,
    statusDate date,
    PRIMARY KEY (id),
    FOREIGN KEY (studentId) REFERENCES students(id),
    FOREIGN KEY (practiceStatus) REFERENCES statuses(id)
);
