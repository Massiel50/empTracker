const inquirer = require("inquirer");
const mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    PORT: 3306,
    user: "root",
    password: "Freaks505$",
    database: "employee_tracker"
});

connection.connect(function(){
    console.log("connection initiated");

    startQuery();
})

function startQuery(){
// display the data in the DB
// connection.query( "SELECT employee.first_name, employee.last_name, role.id FROM employee FULL OUTER JOIN role ON employee.id= role.id",
// (err, results) =>{
//     if(err) throw err;
//     console.table(results);
// })

    // Start to ask what they want to do
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

        switch(response.selected){
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

function viewAllEmp(){
    console.log("This responds")
    connection.query( "SELECT first_name, last_name FROM employee_tracker.employee",
        (err, results) =>{
            if(err) throw err;
            console.table(results);
            startQuery();
        })
}

function viewAllDept(){
    inquirer.prompt([
        {
            type: "list",
            message: "Which department would you like to search by?",
            choices: ["sales", "other"],
            name: "dept"
        }
    ]).then(function(response){
        connection.query( "SELECT * FROM employee_tracker.department WHERE name =?", [response.dept],
        (err, results) =>{
            if(err) throw err;
            for (var i =0; i < results.length; i ++){
                console.log(results[i].dept)
                // startQuery();
            }
            startQuery();
        })
    })
}

function viewAllMangr(){
    connection.query( "SELECT * FROM employee_tracker.department WHERE name =?", [response.dept],
    (err, results) =>{
        if(err) throw err;
        console.table(results);
        startQuery();
    })
}