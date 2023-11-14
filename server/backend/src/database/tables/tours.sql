CREATE TABLE tours (
	tour_id varchar(100) NOT NULL PRIMARY KEY,
	tour_name varchar(250) NOT NULL,
	tour_description varchar(250) NOT NULL,
	period varchar(200) NOT NULL ,
	created_at TIMESTAMP ,
)

select * from tours

-- drop TABLE tours