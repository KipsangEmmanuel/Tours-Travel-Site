CREATE OR ALTER PROCEDURE [dbo].[createBooking]
    @booking_id VARCHAR(100),
    @_id VARCHAR(100),
    @tour_id VARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO dbo.bookings
    (booking_id, _id, tour_id)
    VALUES
    (@booking_id, @_id, @tour_id);
END