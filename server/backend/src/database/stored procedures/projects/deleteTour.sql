CREATE OR ALTER  PROCEDURE [dbo].[deleteTour]
	@tour_id varchar(100)
as

set nocount on;

begin
	delete from dbo.tours
	
	WHERE tour_id = @tour_id;
end;