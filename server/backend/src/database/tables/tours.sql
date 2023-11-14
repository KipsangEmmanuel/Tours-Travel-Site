CREATE TABLE tours (
	tour_id varchar(100) NOT NULL PRIMARY KEY,
	tour_name varchar(250) NOT NULL,
	tour_description varchar(250) NOT NULL,
	start_date DATE ,
	end_date DATE ,
	created_at TIMESTAMP ,
)

select * from tours

-- drop TABLE tours




-- Date => Month/Day/Year