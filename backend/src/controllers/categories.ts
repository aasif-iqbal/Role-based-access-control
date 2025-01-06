import { Request, Response } from "express";
import { ReturnResponse } from "../utils/interfaces";
import { categoryModel } from "../models/categories";

const getCategories = async (req: Request, res: Response): Promise<void> => {}
const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const category_name = await categoryModel.find({ category_name: req.body.category_name });
    
    // check if category name already exists
    if(category_name.length > 0){
      const response: ReturnResponse = {
        status: "error",
        message: "Category name already exists",
        data: []
      }
      res.status(400).json(response);
      return; 
    }

    const category = await categoryModel.create(req.body);
    
    const response: ReturnResponse = {
      status: "success",
      message: "Category created",
      data: category
    }
    
    res.status(201).json(response);

  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

const updateCategory = async (req: Request, res: Response): Promise<void> => {}

const deleteCategory = async (req: Request, res: Response): Promise<void> => {}

export {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
}
