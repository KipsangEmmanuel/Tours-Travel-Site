CREATE PROCEDURE [dbo].[updateTour]
	@tour_id varchar(100),
	@tour_name varchar(100),
	@duedate date,
	@tour_description varchar(500)
as

set nocount on;

begin
	UPDATE dbo.tours
	SET 
	tour_name=@tour_name,
	tour_description=@tour_description,
	duedate=@duedate
	
	WHERE tour_id = @tour_id ;
end;