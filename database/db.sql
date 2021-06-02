CREATE DATABASE database_registers;

USE database_registers;

-- Users Table
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(60) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
    PRIMARY KEY (id)
);

DESCRIBE users;

-- Links Table
CREATE TABLE registers (
    id INT NOT NULL AUTO_INCREMENT,
    concept VARCHAR(150) NOT NULL,
    amount FLOAT NOT NULL,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    type ENUM('income', 'outgoing') NOT NULL,
    user_id INT,
    PRIMARY KEY (id);
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

DESCRIBE registers;

