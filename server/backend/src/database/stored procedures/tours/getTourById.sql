CREATE or alter PROCEDURE [dbo].[getTourById]
	@tour_id VARCHAR(100)
as

set nocount on;

begin
	select *  from tours  
	
    where tour_id = @tour_id
   
end;