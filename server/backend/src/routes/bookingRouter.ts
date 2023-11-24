

import { Router } from 'express';
import { createBooking, deleteBooking, getBooking } from '../controllers/bookingController';

const bookingRouter = Router();

bookingRouter.post('/booking', createBooking);
bookingRouter.get('/:booking_id', getBooking);
bookingRouter.delete('/:booking_id', deleteBooking);

export default bookingRouter;
