CREATE PROCEDURE [dbo].[updateTour]
	@tour_id varchar(100),
	@tour_name varchar(100),
	@price INT,
	@start_date Date,
	@end_date Date,
	@tour_description varchar(500)
as

set nocount on;

begin
	UPDATE dbo.tours
	SET 
	tour_name=@tour_name,
	price=@price,
	tour_description=@tour_description,
	start_date=@start_date,
	end_date=@end_date
	
	WHERE tour_id = @tour_id ;
end;