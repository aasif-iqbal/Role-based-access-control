import express from "express";
import { createPermission } from "../controllers/permissions";
import { validatePermission } from "../middlewares/validators/permission";

const router = express.Router();

router.post("/", validatePermission, createPermission); // POST /v1/permission

export default router;