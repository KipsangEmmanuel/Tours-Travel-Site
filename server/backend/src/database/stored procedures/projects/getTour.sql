CREATE OR ALTER PROCEDURE [dbo].[getSingleTour]
	@tour_id varchar(100)
as

set nocount on;

begin
	select	p._id,
			p.name,
			p.dueDate,
			p.description
	from	[tours] p where _id = @tour_id and isDeleted = 0;
	
end;