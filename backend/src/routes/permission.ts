import express from "express";
import { createPermission } from "../controllers/permissions";
import { validatePermission } from "../middlewares/validators/permission";
import Auth from "../middlewares/authenticate"; 
import onlyAdminAccess from "../middlewares/onlyAdminAccess";

const router = express.Router();

router.post("/", Auth, onlyAdminAccess, validatePermission, createPermission); // POST /v1/permission

export default router;