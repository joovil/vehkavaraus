INSERT INTO person (apartment, password_hash)
VALUES ('A10', 'abcd');

SELECT * FROM person;
SELECT * FROM person;
INSERT INTO game (name, borrow_status) VALUES ('Lintu peli', 0);

SELECT * FROM game;

INSERT INTO borrow (person, game)
VALUES ('8e61ea00-dc01-4b6d-a7dc-93dfeb3ade24', 2);

INSERT INTO person (apartment, password_hash, role) VALUES
('Apt 101', 'hash1', 'user'),
('Apt 102', 'hash2', 'admin'),
('Apt 103', 'hash3', 'user'),
('Apt 104', 'hash4', 'unverified'),
('Apt 105', 'hash5', 'user');

UPDATE person SET apartment = '108' WHERE apartment = 'Apt 101';

SELECT * FROM person WHERE id = '34559ec5-13df-4012-a907-4cacd52387cb';