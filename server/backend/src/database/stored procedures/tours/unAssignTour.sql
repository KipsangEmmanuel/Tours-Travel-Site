CREATE or alter PROCEDURE [dbo].[unAssignTour]
	@tour_id varchar(100)
	
as

set nocount on;

begin
	delete from AssignedTours
    

    where tour_id = @tour_id 
    
    
end;