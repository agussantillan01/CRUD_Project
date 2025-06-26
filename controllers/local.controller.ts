import { Request, Response } from "express";
import Local from "../models/Local";

//#region validations

const validateLocalData = (data: { name?: string; address?: string; cost?: number }) => {
  const { name, address, cost } = data;
  if (!name || !address || cost === undefined) {
    return false;
  }
  return true;
};

//#endregion

//#region  CRUD
//#region GetAll
export const getAllLocal = async (req: Request, res: Response) => {
  try {
    console.log("DESDE GET ALL");
    const Locals = await Local.findAll();
    res.json(Locals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Internal server error` });
  }
};

//#endregion

//#region  GetXid
export const getLocal = async (req: Request, res: Response) : Promise<any> => {
  try {
    const local = await Local.findByPk(req.params.id);
    if (!local) {
      return res.status(404).json({ message: `Local con id ${req.params.id} no encontrado` });
    }
    res.json(local);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Internal server error` });
  }
};
//#endregion

//#region create 
export const createLocal= async (req: Request, res: Response) : Promise<any>  => {
  if (!validateLocalData(req.body)) {
    return res.status(400).json({ message: `Incomplete data` });
  }

  try {
    const { name, address, cost } = req.body;
    const newLocal = await Local.create({ name, address, cost });
    res.status(201).json(newLocal);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Internal server error` });
  }
};
//#endregion

//#region update
export const updateLocal= async (req: Request, res: Response) : Promise<any> => {
  if (!validateLocalData(req.body)) {
    return res.status(400).json({ message: `Incomplete data`  });
  }

  try {
    const local = await Local.findByPk(req.params.id);
    if (!local) {
      return res.status(404).json({ message: `Local with id ${req.params.id} not found` });
    }
    const { name, address, cost } = req.body;
    await local.update({ name, address, cost });
    res.json(local);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Internal server error` });
  }
};
//#endregion

//#region  delete
export const deleteLocal = async (req: Request, res: Response) : Promise<any>  => {
  try {
    const local = await Local.findByPk(req.params.id);
    if (!local) {
      return res.status(404).json({ message: `Local with id ${req.params.id} not found` });
    }
    await local.destroy();
    res.json({ message: `Local deleted correctly` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Internal server error`});
  }
};
//#endregion

//#endregion