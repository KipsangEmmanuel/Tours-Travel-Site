CREATE TABLE bookings (
  booking_id INT ,
  _id VARCHAR(100) NOT NULL,
  tour_id VARCHAR(100) NOT NULL,
  FOREIGN KEY (_id) REFERENCES users(_id),
  FOREIGN KEY (tour_id) REFERENCES tours(tour_id)
);


SELECT * from bookings

drop TABLE bookings