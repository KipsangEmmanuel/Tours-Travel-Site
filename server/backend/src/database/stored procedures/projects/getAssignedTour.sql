

CREATE or alter PROCEDURE [dbo].[getAssignedTour]
	@tour_id varchar(100)
	
as

set nocount on;

begin
	select *  from AssignedTours    

    where tour_id = @tour_id 
    
end;