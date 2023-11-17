// bookingValidator.ts

import Joi from 'joi';

export const validateBooking = Joi.object().keys({
  _id: Joi.string().required(),
  tour_id: Joi.string().required(),
});

export const validateBookingId = Joi.object().keys({
  booking_id: Joi.number().required(),
});
