CREATE TABLE AssignedProjects (
	
	project_id varchar(100) NOT NULL UNIQUE,
	user_id varchar(100) NOT NULL UNIQUE
	
)

drop table AssignedProjects

select * from AssignedProjects