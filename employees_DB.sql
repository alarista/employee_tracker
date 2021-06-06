DROP DATABASE IF EXISTS employees_DB;

CREATE DATABASE employees_DB;

USE employees_DB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL (10,2) NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tyler", "Wright", 1, 10), ("Erin", "Altea", 2, 20);

INSERT INTO role (title, salary, department_id)
VALUES ("Software Intenr", 15000, 1), ("Sales Intern", 12000, 2);

INSERT INTO department (name)
VALUES ("Engineering"), ("Sales");