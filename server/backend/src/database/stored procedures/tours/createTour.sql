CREATE OR ALTER PROCEDURE [dbo].[createTour]
	@tour_id varchar(100),
	@tour_name varchar(100),
	@start_date Date,
	@end_date Date,
	@tour_description varchar(250)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO dbo.tours
    (tour_id, tour_name, start_date, end_date, tour_description)
    VALUES
    (@tour_id, @tour_name, @start_date, @end_date, @tour_description);
END
