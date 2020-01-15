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
// connection.query( 
// "SELECT employee.first_name as employee_first, employee.last_name as employee_last, role.title, department.name as dept FROM employee JOIN role on role.id = employee.role_id JOIN department on role.department_id = department.id",
// (err, results) =>{
//     if(err) throw err;
//     console.table(results)
// })

    // Start to ask what they want to do
    inquirer.prompt([
        {
            type: 'list',
            message: 'Select an action',
            choices: [
                "View all employee's", 
                "View all employee's by dept",
                "Add employee", 
                "Remove employee", 
                "Update employee role", 
                "Update employee manager",
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
           
            case "add employee":
                addEmployee();
                break;
            case "remove employee":
                remEmployee();
                break; 
            case "update employee role":
                updEmplRole();
                break;
            
        }
    })
}
// function that displays all employees name title salary & dept
function viewAllEmp(){
    console.log("This responds")
    connection.query( "SELECT employee.first_name as employee_first, employee.last_name as employee_last, role.title, role.salary, department.name as dept FROM employee JOIN role on role.id = employee.role_id JOIN department on role.department_id = department.id",
        (err, results) =>{
            if(err) throw err;
            console.table(results);
            startQuery();
        })
}

// function viewAllDept(){
//     inquirer.prompt([
//         {
//             type: "list",
//             message: "Which department would you like to search by?",
//             choices: ["sales", "other"],
//             name: "dept"
//         }
//     ]).then(function(response){
//         connection.query( "SELECT * FROM department_name WHERE name =?", [response.dept],
//         (err, results) =>{
//             if(err) throw err;
//             for (var i =0; i < results.length; i ++){
//                 console.log(results[i].dept)
               
//             }
//             startQuery();
//         })
//     })
// }

function addEmployee(){
    inquirer.prompt([{
        type: "input",
        message: "What is the employee's first name?",
        name: "first_name"
    },
    {
        type: "input",
        message: "What is the employee's last name?",
        name: "last_name"
    },
    {
        type: "input",
        message: "What role do you want to add employee to?",
        name: "role_id"
    },
    {
        type: "input",
        message: "What department do you want to add employee to?",
        name: "department_id"
    }
    ]).then(function(answers){
        // const {first_name, last_name, role_id, department_id} = answers;
      let query = connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: answers.first_name,
            last_name: answers.last_name,
            role_id: answers.role_id,
            department_id: answers.department_id
          },
          function(err, res) {
            if (err) throw err;
            // Call updateProduct AFTER the INSERT completes
            startQuery();
          }
        );
      
        // logs the actual query being run
        console.log(query.sql);
      }


//     connection.query( "SELECT * FROM employee_tracker.department WHERE name =?", [response.dept],
//     (err, results) =>{
//         if(err) throw err;
//         console.table(results);
//         startQuery();
//     })
// }
    )};

function remEmployee(){
    connection.query( "SELECT first_name FROM employee", function(err, res) {
        if(err) throw err;
        console.log("selecting employee...");
        inquirer.prompt([
        
            {
                type: "list",
                message: "Which employee do you want to delete?",
                choices: function emplChoice(){
                    let emplPool = [];
                    console.log(res)
                    for (var i = 0; i < res.length; i ++){
                        emplPool.push(res[i].first_name);
                    }
                    return emplPool;
                },
                name: "employee"
            }
        ]).then(function(answers){
        console.log("Deleting Employee...\n");
  connection.query(
    "DELETE FROM employee WHERE ?=",
    {
        first_name: answers.first_name,
        last_name: answers.last_name,
        role_id: answers.role_id,
        department_id: answers.department_id
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " products deleted!\n");
      // Call readProducts AFTER the DELETE completes
      startQuery();
    }
  );

                
            })
        // connection.end();
    });
}
    
    

    