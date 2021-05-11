DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE department (
    dID INT AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (dID)
);

CREATE TABLE role (
    rID INT AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10, 2),
    department_id INT,
    PRIMARY KEY (rID),
    FOREIGN KEY (department_id) REFERENCES department (dID)
);

CREATE TABLE employee (
    eID INT AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (eID),
    FOREIGN KEY (role_id) REFERENCES role (rID),
    FOREIGN KEY (manager_id) REFERENCES employee (eID)
);