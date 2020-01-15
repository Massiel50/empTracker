drop database if exists employee_tracker;
create database employee_tracker;

use employee_tracker;

create table employee(
	id INTEGER primary key auto_increment not null,
	first_name VARCHAR(30),
	last_name VARCHAR(30),
	role_id INTEGER(10),
	foreign key(role_id) references role(id) on delete cascade
);

create table role(
	id INTEGER primary key auto_increment not null,
	title VARCHAR(30),
	salary DEC(10,2),
	department_id INTEGER(3),
	foreign key (department_id) references department(id)
);

create table department(
	id INTEGER primary key auto_increment not null,
	name VARCHAR(30)
);



insert into department(name)
values("sales");

insert into department( name)
values ("admin");

insert into role(title, salary, department_id)
values("clerk", 5000, 1);

insert into role(title, salary, department_id)
values("supervisor", 35000, 2);

insert into role(title, salary, department_id)
values("accountant", 42000, 2);

insert into employee (first_name, last_name, role_id)
values ("Wanda", "Witch", 1);

insert into employee (first_name, last_name, role_id)
values ("John", "Doe", 2);

insert into employee (first_name, last_name, role_id)
values ("Melissa", "Smith", 2);
-- 
-- SELECT employee.first_name, employee.last_name, role.title, FROM employee JOIN role ON role_id= role.id;
-- join department on department_id = department.id ;

SELECT
        employee.first_name as employee_first,
        employee.last_name as employee_last,
        role.title,
        department.name as dept
 FROM employee
 JOIN role on role.id = employee.role_id
 JOIN department on role.department_id = department.id
