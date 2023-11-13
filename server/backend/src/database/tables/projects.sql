CREATE TABLE projects (
	project_id varchar(100) NOT NULL PRIMARY KEY,
	project_name varchar(250) NOT NULL,
	project_status VARCHAR(20) default 'unassigned' ,
	project_description varchar(250) NOT NULL,
	dueDate DATE ,
	created_at TIMESTAMP ,
	isDeleted BIT NOT NULL DEFAULT 0,
	isCompleted BIT NOT NULL DEFAULT 0,
)

-- drop TABLE projects


select * from dbo.projects