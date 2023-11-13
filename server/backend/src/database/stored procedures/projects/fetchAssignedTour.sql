CREATE or alter PROCEDURE fetchAssignedTour
    @user_id varchar(100)
AS
BEGIN
    SELECT p.tour_id, p.tour_name, p.tour_description, p.dueDate ,p.tour_status
    FROM AssignedTours ap
    INNER JOIN tours p ON ap.tour_id = p.tour_id
    WHERE ap.user_id = @user_id
        AND p.tour_status = 'assigned' or p.tour_status = 'in Progress' ;
END
