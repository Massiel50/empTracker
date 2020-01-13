drop database if exists employee_tracker;
create database employee_tracker;

use employee_tracker;

create table employee(
	id INTEGER primary key auto_increment not null,
	first_name VARCHAR(30),
	last_name VARCHAR(30),
	role_id INTEGER(10),
	manager_id INTEGER(10)
-- 	foreign key(role_id) references employee_role(id) on delete cascade,
-- 	foreign key(manager_id) references employee(id) on delete cascade
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

insert into employee (first_name, last_name)
values ("Wanda", "Witch");

insert into employee (first_name, last_name)
values ("John", "Doe");

insert into employee (first_name, last_name)
values ("Melissa", "Smith");

insert into department(name)
values("sales");
