CREATE or alter PROCEDURE [dbo].[inProgressProject]
	@project_id varchar(100)
	
as

set nocount on;

begin
	UPDATE dbo.projects
	SET 
	project_status = 'in Progress'
    	
	WHERE project_id = @project_id ;
end;