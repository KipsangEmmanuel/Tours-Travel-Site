CREATE OR ALTER  PROCEDURE [dbo].[getUsers]
as

set nocount on;

begin
	select	u.[_id],
			u.username,
			u.email,
			u.role
	from	[users] u where role = 0
end;