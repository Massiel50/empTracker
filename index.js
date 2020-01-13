const inquirer = require("inquirer");
const mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    PORT: 3306,
    user: "root",
    password: "",
    database: ""
});

connection.connect(function(){
    if(err) throw err;
    console.log("connection initiated");

    startQuery();
})

function startQuery(){
    inquirer.prompt([
        {
            type: 'list',
            message: 'Select an action',
            choices: [
                "View all employee's", 
                "View all employee's by dept", 
                "View all employee's by manager", 
                "add employee", 
                "remove employee", 
                "update employee role", 
                "update employee manager",
                ],
            name: "selected"
        }
    ]).then(function(response){

        switch(response){
            case  "View all employee's":
                viewAllEmp();
                break;
            case "View all employee's by dept":
                viewAllDept();
                break;
            case "View all employee's by manager":
                viewAllMangr();
                break;
            case "add employee":
                addEmployee();
                break;
            case "remove employee":
                remEmployee();
                break; 
            case "update employee role":
                updEmplRole();
                break;
            case "update employee manager":
                updEmplMangr();
                break;
        }
    })
}