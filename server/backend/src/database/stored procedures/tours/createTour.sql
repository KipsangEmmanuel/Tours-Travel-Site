

CREATE OR ALTER PROCEDURE [dbo].[createTour]
	@tour_id varchar(100),
	@tour_name varchar(100),
	@period date,
	@tour_description varchar(250)
AS

BEGIN
    set nocount on;

    INSERT INTO dbo.tours
    (tour_id, tour_name, period, tour_description)
    VALUES
    (@tour_id,@tour_name, @period, @tour_description)
END