CREATE or alter PROCEDURE [dbo].[completeTour]
	@tour_id varchar(100)
	
as

set nocount on;

begin
	UPDATE dbo.tours
	SET 
	tour_status = 'completed'
    	
	WHERE tour_id = @tour_id ;
end;