CREATE PROCEDURE getUsers_
AS
BEGIN
    SELECT * FROM users_ WHERE role != 'admin'
END;

-- drop PROCEDURE getUsers