CREATE OR ALTER PROCEDURE getUserByEmail
	@email	varchar(250)
as

set nocount on;

begin
	select	u.[_id],
			u.email,
			u.username,
			u.password,
			u.role
	from	[users] u where email = @email ;
end;




-- exec getUserByEmail