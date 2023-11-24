CREATE PROCEDURE getUsers
AS
BEGIN
    SELECT * FROM users WHERE role != 'admin'
END;