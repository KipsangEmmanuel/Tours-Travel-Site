// import { updatTour } from "./../types/tourInterface";
import { Request, Response } from "express";
import { execute, query } from "../services/dbconnect";

import { v4 as uuidv4 } from "uuid";
import {
  validateTour,
  validateTourId,
  validateUpdateTour,
} from "../validators/tourValidator";
import { Tour } from "../types/tourInterface";
import { user } from "../types/userInterfaces";

export const createTour = async (req: Request, res: Response) => {
  try {
    const { tour_name, tour_description, start_date, end_date } = req.body;

    const { error } = validateTour.validate(req.body);

    if (error)
      return res
        .status(400)
        .send({ success: false, message: "please place correct details" });

    const newTour: Tour = {
      tour_id: uuidv4(),
      tour_name,
      start_date,
      end_date,
      tour_description,
    };

    const procedure = "createTour";
    const params = newTour;

    await execute(procedure, params);
    return res.send({ message: "Tour created successfully" });
  } catch (error) {
    console.log(error);
    res.send((error as Error).message);
  }
};


export const updateTour = async (req: Request, res: Response) => {
  try {
    const { tour_id, tour_name, tour_description, start_date, end_date } = req.body;

    const { error } = validateUpdateTour.validate(req.body);
    if (error)
      return res.status(400).send({ message: "please put correct details" });

    const newTour: Tour = {
      tour_id,
      tour_name,
      tour_description,
      start_date,
      end_date
    };

    const ProcedureName = "updateTour";
    const params = newTour;

    await execute(ProcedureName, params);

    return res.status(200).send({ message: "Tour updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: (error as Error).message,
      message: "Internal Sever Error",
    });
  }
};

export const deleteTour = async (req: Request, res: Response) => {
  try {
    const tour_id = req.params.tour_id;
    if (!tour_id) return res.status(400).send({ message: "Id is required" });

    const { error } = validateTourId.validate(req.params);

    if (error)
      return res
        .status(400)
        .send({ success: false, message: "please input id" });

    const procedureName = "deleteTour";
    await execute(procedureName, { tour_id });

    res.status(201).send({ message: "Tour deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: (error as Error).message,
      message: "Internal Sever Error",
    });
  }
};


export const completeTour = async (req: Request, res: Response) => {
  try {
    const tour_id = req.params.tour_id;
    // console.log(tour_id);

    if (!tour_id) return res.status(400).send({ message: "Id is required" });

    const procedureName = "completeTour";
    await execute(procedureName, { tour_id });

    res.status(201).send({ message: "Tour completed Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: (error as Error).message,
      message: "Internal Sever Error",
    });
  }
};


export const inProgressTour = async (req: Request, res: Response) => {
  try {
    const tour_id = req.params.tour_id;
    // console.log(tour_id);

    if (!tour_id) return res.status(400).send({ message: "Id is required" });

    const procedureName = "inProgressTour";
    await execute(procedureName, { tour_id });

    res.status(201).send({ message: "Tour placed in Progress" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: (error as Error).message,
      message: "Internal Sever Error",
    });
  }
};


export const getTour = async (req: Request, res: Response) => {
  try {
    const tour_id = req.params.tour_id;
    // console.log(id);
    if (!tour_id) return res.status(400).send({ message: "Id is required" });

    const { error } = validateTourId.validate(req.params);

    if (error)
      return res
        .status(400)
        .send({ success: false, message: error.details[0].message });

    const procedureName = "getTourById";
    const result = await execute(procedureName, { tour_id });

    res.json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: "internal server error" });
  }
};


export const getTours = async (req: Request, res: Response) => {
  try {
    const procedureName = "getTours";
    const result = await query(`EXEC ${procedureName}`);
    // console.log(result.recordset);

    return res.json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: "internal server error" });
  }
};


export const getAssignedTours = async (req: Request, res: Response) => {
  try {
    const procedureName3 = "getAssignedTours";

    const result = await query(`EXEC ${procedureName3}`);

    return res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: "internal server error" });
  }
};


export const assignTour = async (req: Request, res: Response) => {
  try {
    const tour_id = req.body.tour_id;
    const user_id = req.body.user_id;
    // console.log(tour_id);

    if (!tour_id)
      return res.status(400).send({ message: "tour Id is required" });
    if (!user_id)
      return res.status(400).send({ message: "user Id is required" });

    const procedureName3 = "getAssignedTour";
    const params = { tour_id };

    const result = await execute(procedureName3, params);
    if (result.recordset.length > 0)
      return res.status(400).send({ message: "Tour already assigned" });

    const tour_status = "assigned";

    const procedureName = "assignTour";
    const procedureName2 = "assignTourStatus";
    await execute(procedureName, { tour_id, user_id });
    await execute(procedureName2, { tour_id, tour_status });

    res.status(201).send({ message: "Tour Assigned Successfully" });
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: "internal server error" });
  }
};


export const unassignTour = async (req: Request, res: Response) => {
  try {
    const tour_id = req.body.tour_id;

    console.log(tour_id);

    if (!tour_id)
      return res.status(400).send({ message: "tour Id is required" });

    const procedureName3 = "getAssignedTour";
    const params = { tour_id };

    const result = await execute(procedureName3, params);
    // console.log(result.recordset);

    if (result.recordset.length === 0)
      return res.status(400).send({ message: "Tour already unassigned" });

    const tour_status = "unassigned";

    const procedureName = "unAssignTour";
    const procedureName2 = "assignTourStatus";
    await execute(procedureName, { tour_id });
    await execute(procedureName2, { tour_id, tour_status });

    res.status(201).send({ message: "Tour unassigned Successfully" });
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: "internal server error" });
  }
};


export const getUserAssignedTour = async (req: Request, res: Response) => {
  try {
    const user_id = req.body.user_id;
    // console.log(user_id);

    if (!user_id)
      return res.status(400).send({ message: "user Id is required" });

    const procedureName3 = "fetchAssignedTour";
    const params = { user_id };

    const result = await execute(procedureName3, params);

    // console.log({ tour: result.recordset[0] });

    if (result.recordset.length === 0) {
      res.status(200).json({ tour: [] });
    } else {
      res.json(result.recordset[0]);
    }
  } catch (error) {
    console.log(error);
    res.status(404).send({ error: "internal server error" });
  }
};
