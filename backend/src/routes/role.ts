import express from "express";
import { createRoles } from "../controllers/roles";
import { validateRole } from "../middlewares/validators/role";

const router = express.Router();

router.post("/", validateRole, createRoles); // POST /v1/user

export default router;