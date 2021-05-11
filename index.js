const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employeeDB"
})

const menu = [
    {
        type: "list",
        name: "menuItem",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Employees By Role",
            "View All Employees By Department",
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
                    
                    (err, res) => {
                        // console.table(res);
                        // generateMenu();
                        console.log(res);
                    }
                )
            } else if (data.positionSelect === "View All Employees By Role") {
                
            }
        })
}

const startup = () => {
    generateMenu();
}

startup();