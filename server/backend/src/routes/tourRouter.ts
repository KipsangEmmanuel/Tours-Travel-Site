import { Router } from "express";

import {
  assignTour,
  completeTour,
  createTour,
  deleteTour,
  getAssignedTours,
  getTour,
  getTours,
  getUserAssignedTour,
  unassignTour,
  updateTour,
  inProgressTour,
} from "../controllers/tourController";

const tour_router = Router();

tour_router.post("/", createTour);
tour_router.get("/", getTours);
tour_router.put("/", updateTour);

tour_router.get("/complete/:tour_id", completeTour);
tour_router.get("/inprogress/:tour_id", inProgressTour);
tour_router.get("/complete", createTour);
tour_router.post("/getUserAssignedTours", getUserAssignedTour);
tour_router.get("/getAssigned", getAssignedTours);
tour_router.post("/assign", assignTour);
tour_router.post("/unAssign", unassignTour);
tour_router.get("/:tour_id", getTour);
tour_router.delete("/:tour_id", deleteTour);

export default tour_router;
