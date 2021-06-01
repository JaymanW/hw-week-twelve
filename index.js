const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employeedb"
})

const menu = [
    {
        type: "list",
        name: "menuItem",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View Roles",
            "View Departments",
            "Add Employee",
            "Add Role",
            "Add Department",
            "Update Employee Roles"
        ]
    }
];

const generateMenu = () => {
    inquirer.prompt(menu)
        .then(data => {
            if (data.menuItem === "View All Employees") {
                connection.query(
                    "SELECT employee.eID AS Employee_ID, CONCAT(employee.first_name, ' ', employee.last_name) AS Employee, title AS Role, name AS Department FROM employee LEFT JOIN role ON role.rID = employee.role_id LEFT JOIN department ON department.dID = role.department_id",
                    (err, res) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.table(res);
                            generateMenu();
                        }
                    }
                )
            } else if (data.menuItem === "View Roles") {
                connection.query(
                    "SELECT title AS Roles FROM role",
                    (err, res) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.table(res);
                            generateMenu();
                        }
                    }
                )
            } else if (data.menuItem === "View Departments") {
                connection.query(
                    "SELECT name AS Departments FROM department",
                    (err, res) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.table(res);
                            generateMenu();
                        }
                    }
                )
            } else if (data.menuItem === "Add Employee") {
                let employeeFirstName;
                let employeeLastName;
                let employeeRole;
                
                let roles = [];
                connection.query(
                    "SELECT title FROM role",
                    (err, res) => {
                        res.map(role => {
                            roles.push(role.title);
                        })
                        inquirer.prompt([
                            {
                                type: 'input',
                                name: 'firstName',
                                message: `Enter new employee's first name.`
                            },
                            {
                                type: 'input',
                                name: 'lastName',
                                message: `Enter new employee's last name.`
                            },
                            {
                                type: 'list',
                                name: 'role',
                                message: `Enter new employee's role.`,
                                choices: roles
                            }
                        ])
                        .then(res => {
                            employeeFirstName = res.firstName;
                            employeeLastName = res.lastName;
                            employeeRole = res.role;
                            connection.query(
                                "INSERT INTO employee (first_name, last_name, role_id) VALUES ('" + employeeFirstName + "', '" + employeeLastName + "', (SELECT rID FROM role WHERE title = '" + employeeRole + "'))",
                                (err, res) => {
                                    console.log("Employee added!");
                                    generateMenu();
                                }
                            )
                        })
                    }
                )
            } else if (data.menuItem === "Add Role") {
                connection.query(
                    "SELECT name FROM department",
                    (err, res) => {
                        let departments = [];
                        res.map(department => {
                            departments.push(department.name)
                        });
                        inquirer.prompt([
                            {
                                type: 'input',
                                name: 'role',
                                message: 'Enter new role name.'
                            },
                            {
                                type: 'list',
                                name: 'department',
                                message: 'Select which department the new role belongs to.',
                                choices: departments
                            }
                        ])
                        .then(res => {
                            const roleName = res.role;
                            const roleDepartment = res.department;
                            connection.query(
                                "INSERT INTO role (title, department_id) VALUES ('" + roleName + "', (SELECT dID FROM department WHERE name = '" + roleDepartment + "'))",
                                (err, res) => {
                                    console.log("Role added!");
                                    generateMenu();
                                }
                            )
                        })
                    }
                )
            } else if (data.menuItem === "Add Department") {
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'departmentName',
                        message: 'Enter new department name.'
                    }
                ])
                .then(res => {
                    const departmentName = res.departmentName;
                    connection.query(
                        "INSERT INTO department (name) VALUE ('" + departmentName + "')",
                        (err, res) => {
                            console.log("Department added.")
                            generateMenu();
                        }
                    )
                })
            }
        })
}

const startup = () => {
    generateMenu();
}

connection.connect(err => {
    console.log(`Connected as ID: ${connection.threadId}`);
    startup();
})