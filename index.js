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
]

const generateMenu = () => {
    inquirer.prompt(menu)
        .then(data => {
            if (data.menuItem === "View All Employees") {
                connection.query(
                    "SELECT employee.eID AS Employee_ID, CONCAT(employee.first_name, ' ', employee.last_name) AS Employee, title AS Role, name AS Department FROM employee LEFT JOIN role ON role.rID = employee.role_id LEFT JOIN department ON department.dID = role.department_id",
                    function(err, res) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.table(res);
                        }
                    }
                )
            } else if (data.positionSelect === "View All Employees By Role") {
                
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