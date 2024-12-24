import express from "express";
import { createPermission } from "../controllers/permissions";
import { validatePermission } from "../middlewares/validators/permission";
import Auth from "../middlewares/authenticate"; 

const router = express.Router();

router.post("/", Auth, validatePermission, createPermission); // POST /v1/permission

export default router;