CREATE OR ALTER  PROCEDURE [dbo].[assignUser]
    @user_id varchar(100),
    @tour_id varchar(100),
    @status VARCHAR(20)

as

set nocount on;

begin
	UPDATE dbo.AssignedTours SET user_id = @user_id, status = @status , tour_id = @tour_id 
    
end;
GO