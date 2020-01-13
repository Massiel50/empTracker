const inquirer = require("inquirer");
const mysql = require("mysql");

var connection = mysql.createConnection(function(){
    if (err) throw err;

    startQuery();

});

function startQuery(){
    
}