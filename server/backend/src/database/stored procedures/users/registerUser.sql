
CREATE OR ALTER PROCEDURE registerUser
	@id varchar(100),
	@username varchar(100),	
	@email varchar(250),
	@password varchar(250)

AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO users_
	(id, username, email,password)
	VALUES
	(@id, @username, @email, @password);
END;