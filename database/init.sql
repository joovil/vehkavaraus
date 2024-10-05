CREATE DATABASE vehka;

\c vehka;

CREATE TYPE roles AS ENUM ('unverified', 'user', 'admin');

CREATE TABLE person (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    apartment TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    role roles DEFAULT 'unverified'
);

CREATE TYPE borrow_statuses AS ENUM ('free', 'borrowed', 'late');

CREATE TABLE game (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    borrow_status borrow_statuses DEFAULT 'free'
);

CREATE TABLE borrow (
    id SERIAL PRIMARY KEY,
    person UUID,
    game integer,
    borrow_date TIMESTAMP DEFAULT CURRENT_DATE,
    return_date TIMESTAMP,
    FOREIGN KEY (person) REFERENCES person(id),
    FOREIGN KEY (game) REFERENCES game(id)
);