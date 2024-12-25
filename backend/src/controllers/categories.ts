import { Request, Response } from "express";
import { ReturnResponse } from "../utils/interfaces";
import { categoryModel } from "../models/categories";

const getCategories = async (req: Request, res: Response): Promise<void> => {}
const createCategory = async (req: Request, res: Response): Promise<void> => {}
const updateCategory = async (req: Request, res: Response): Promise<void> => {}
const deleteCategory = async (req: Request, res: Response): Promise<void> => {}

export {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
}
