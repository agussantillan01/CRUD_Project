import { Request, Response } from "express";
import Product from "../models/product";

//#region validations

const validateProductData = (data: { name?: string; address?: string; cost?: number }) => {
  const { name, address, cost } = data;
  if (!name || !address || cost === undefined) {
    return false;
  }
  return true;
};

//#endregion

//#region  CRUD
//#region GetAll
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Internal server error` });
  }
};

//#endregion

//#region  GetXid
export const getProduct = async (req: Request, res: Response) : Promise<any> => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: `Producto con id ${req.params.id} no encontrado` });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Internal server error` });
  }
};
//#endregion

//#region create 
export const createProduct = async (req: Request, res: Response) : Promise<any>  => {
  if (!validateProductData(req.body)) {
    return res.status(400).json({ message: `Incomplete data` });
  }

  try {
    const { name, address, cost } = req.body;
    const newProduct = await Product.create({ name, address, cost });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Internal server error` });
  }
};
//#endregion

//#region update
export const updateProduct = async (req: Request, res: Response) : Promise<any> => {
  if (!validateProductData(req.body)) {
    return res.status(400).json({ message: `Incomplete data`  });
  }

  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: `Product with id ${req.params.id} not found` });
    }
    const { name, address, cost } = req.body;
    await product.update({ name, address, cost });
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Internal server error` });
  }
};
//#endregion

//#region  delete
export const deleteProduct = async (req: Request, res: Response) : Promise<any>  => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: `Product with id ${req.params.id} not found` });
    }
    await product.destroy();
    res.json({ message: `product deleted correctly` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Internal server error`});
  }
};
//#endregion

//#endregion