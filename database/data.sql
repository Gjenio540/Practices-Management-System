INSERT INTO users VALUES (1, "100001", "$2b$10$Yycqdz0P1A6PfSwjqf8jWu8Tlvr8KFm.fwoZQum5VcZ.loppU/Sp2", "student");
INSERT INTO users VALUES (2, "100002", "$2b$10$FwLLzSuqLz6Aa7dSGhZMSufNgvg0i/dpYANdB7DXulx8jWjz4rNpG", "student");
INSERT INTO users VALUES (3, "100003", "$2b$10$esSP98gI/lVmfPHoqksYpewXDgXnqnnlfZRMIslFdEDuM2pJjzgde", "student");
INSERT INTO users VALUES (4, "100004", "$2b$10$shTmPRdbYz7TQoG7o6ZIjeSA9eM.92B81QBNJ8xrLsjI9Gx9d/.Zy", "student");
INSERT INTO users VALUES (5, "100005", "$2b$10$NTzWGBn8g5QtCrQM2Xsc5ukUIX3EAA2rMn1DOPWdEmB6346o5SQyy", "student");
INSERT INTO users VALUES (6, "100006", "$2b$10$QP5.D6grNL.7c69bRuczeOcMsq3WJc04PSVlePpDA8VvxD8mYtAbu", "student");
INSERT INTO users VALUES (7, "100007", "$2b$10$0tWrxE1yJe9sXsidC0iwSO.ordMOfXnbKW3JBl9Myx2rEW/p8PfwC", "student");
INSERT INTO users VALUES (8, "100008", "$2b$10$qGeMS4ANB64epD7S9qPQtO/1w3nUIG.VWgGrV6/RmKabmlm2.qr0S", "student");
INSERT INTO users VALUES (9, "100009", "$2b$10$Q2fEbSthh6W61gndl/qrkuLAeywme5O89UcRMQUf2U3biFznpBHj2", "student");
INSERT INTO users VALUES (10, "100010", "$2b$10$OVkD051hwWucK7eQAoJLNOSbX3JD7Sy3K9szFLODmqICdprow6B9C", "student");

INSERT INTO users VALUES (11, "A.Poplawski", "$2b$10$6UNVUi9vpVD/OsGBytRhI.LbJh/BP5EkOB22MU1h0n9SMXKmXrK2G", "supervisor");
INSERT INTO users VALUES (12, "K.Mielcarek", "$2b$10$LHmoIazNff0pyQuV8J3NeOabaNd.6lGkIumb1ZPfwquYTWG6cxJt6", "supervisor");

INSERT INTO supervisors VALUES (1, "Andrzej", "Popławski", "A.Poplawski@imei.uz.zgora.pl", 11);
INSERT INTO supervisors VALUES (2, "Kamil", "Mielcarek", " K.Mielcarek@imei.uz.zgora.pl", 12);

INSERT INTO areas VALUES (1, "Informatyka", 1);
INSERT INTO areas VALUES (2, "Biznes Elektroniczny", 1);
INSERT INTO areas VALUES (3, "Elektrotechnika", 2);
INSERT INTO areas VALUES (4, "Automatyka i Robotyka", 2);

INSERT INTO students VALUES (1, "Sara", "Michalak", "100001", "21INF-SP", "-",1, 1);
INSERT INTO students VALUES (2, "Damian", "Borowski", "100002", "22INF-SP", "-", 1, 1);
INSERT INTO students VALUES (3, "Adrian", "Pietrzak", "100003", "23INF-SP", "-", 1, 1);
INSERT INTO students VALUES (4, "Danuta", "Markiewicz", "1000004", "21E-B-SP", "-", 2, 1);
INSERT INTO students VALUES (5, "Mikołaj", "Chmielewski", "1000005", "21E-B-SP", "-", 2, 1);
INSERT INTO students VALUES (6, "Eliza", "Madej", "1000006", "21E-SP", "-", 3, 1);
INSERT INTO students VALUES (7, "Jakub", "Wysocki", "1000007", "21E-SP", "-", 3, 1);
INSERT INTO students VALUES (8, "Norbert", "Michalak", "1000008", "21E-SP", "-", 3, 1);
INSERT INTO students VALUES (9, "Sebastian", "Jasiński", "1000009", "21AiR-SP", "-", 4, 1);
INSERT INTO students VALUES (10, "Marta", "Wesołowska", "1000010", "22AiR-SP", "-", 4, 1);

INSERT INTO statuses VALUES(1, "Nowa praktyka");
INSERT INTO statuses VALUES(2, "Zaliczona");
INSERT INTO statuses VALUES(3, "Nie zaliczona");
