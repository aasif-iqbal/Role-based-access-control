import express from "express";
import { createCategory, getCategories } from "../controllers/categories";
import onlyAdminAccess from "../middlewares/onlyAdminAccess";
import Auth from "../middlewares/authenticate";
import checkPermission from "../middlewares/checkPermission";
import { validateCategory } from "../middlewares/validators/category";

const router = express.Router();

router.post("/", Auth, onlyAdminAccess, validateCategory, createCategory); // POST /v1/categories

router.get("/", Auth, checkPermission, getCategories); // GET /v1/categories

export default router;