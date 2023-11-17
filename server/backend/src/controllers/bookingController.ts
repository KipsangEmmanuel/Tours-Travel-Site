// bookingController.ts

import { Request, Response } from 'express';
import { execute } from '../services/dbconnect';
import { v4 as uuidv4 } from 'uuid';
import { validateBooking, validateBookingId } from '../validators/bookingValidator';

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { _id, tour_id } = req.body;

    const { error } = validateBooking.validate(req.body);

    if (error) {
      return res.status(400).send({ success: false, message: 'Please provide correct details' });
    }

    const newBooking = {
      booking_id: uuidv4(),
      _id,
      tour_id,
    };

    const procedure = 'createBooking';
    const params = newBooking;

    await execute(procedure, params);
    return res.send({ message: 'Booking created successfully' });
  } catch (error) {
    console.log(error);
    res.send((error as Error).message);
  }
};

export const deleteBooking = async (req: Request, res: Response) => {
  try {
    const booking_id = req.params.booking_id;

    if (!booking_id) {
      return res.status(400).send({ message: 'Booking ID is required' });
    }

    const { error } = validateBookingId.validate({ booking_id });

    if (error) {
      return res.status(400).send({ success: false, message: 'Please provide a valid Booking ID' });
    }

    const procedureName = 'deleteBooking';
    await execute(procedureName, { booking_id });

    res.status(201).send({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: (error as Error).message,
      message: 'Internal Server Error',
    });
  }
};

export const getBooking = async (req: Request, res: Response) => {
  try {
    const booking_id = req.params.booking_id;

    if (!booking_id) {
      return res.status(400).send({ message: 'Booking ID is required' });
    }

    const { error } = validateBookingId.validate({ booking_id });

    if (error) {
      return res.status(400).send({ success: false, message: 'Please provide a valid Booking ID' });
    }

    const procedureName = 'getBookingById';
    const result = await execute(procedureName, { booking_id });

    res.json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: 'Internal Server Error' });
  }
};
