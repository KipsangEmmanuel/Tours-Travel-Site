CREATE PROCEDURE deleteTour(@tour_id VARCHAR(100))

AS BEGIN
  DELETE  FROM Tours  WHERE tour_id = @tour_id;
END;




-- DROP PROCEDURE IF EXISTS deleteTour;