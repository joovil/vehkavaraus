CREATE DATABASE vehka;

\ connect vehka;

CREATE TYPE roles AS ENUM ('user', 'admin');

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() UNIQUE,
    username TEXT NOT NULL UNIQUE CHECK (char_length(username) > 2),
    password_hash TEXT NOT NULL,
    apartment TEXT NOT NULL,
    role roles DEFAULT 'user' NOT NULL
);

CREATE TYPE borrow_statuses AS ENUM ('free', 'borrowed', 'late');

CREATE TABLE games (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    borrow_status borrow_statuses DEFAULT 'free'
);

CREATE TABLE borrows (
    id SERIAL PRIMARY KEY,
    borrower UUID,
    game integer,
    borrow_date TIMESTAMP DEFAULT CURRENT_DATE,
    return_date TIMESTAMP,
    FOREIGN KEY (borrower) REFERENCES users(id),
    FOREIGN KEY (game) REFERENCES games(id)
);