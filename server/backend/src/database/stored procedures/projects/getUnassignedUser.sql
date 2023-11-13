CREATE or alter PROCEDURE [dbo].[getUnassignedUser]
	
as
BEGIN
    SELECT u.username,
    u._id
    FROM users u
    WHERE NOT EXISTS (
        SELECT 1
        FROM AssignedTours ap
        WHERE ap.user_id = u._id 
        
    ) and u.role = 0;
END

