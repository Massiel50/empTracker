drop database if exists employee_tracker;
create database employee_tracker;

use employee_tracker;

create table employee(
	id INTEGER primary key auto_increment not null,
	first_name VARCHAR(30),
	last_name VARCHAR(30),
	role_id INTEGER(3),
	manager_id INTEGER(3),
	foreign key(role_id) references role(id),
	foreign key(manager_id) references role(title)
);

create table role(
	id INTEGER primary key auto_increment not null,
	title VARCHAR(30),
	salary DEC(3,2),
	department_id INTEGER(3),
	foreign key (department_id) references department(id)
);

create table department(
	id INTEGER primary key auto_increment not null,
	name VARCHAR(30)
);
