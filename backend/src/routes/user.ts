import express from "express";
import { registration } from "../controllers/users";
import { validateUser } from "../middlewares/validators/user";

const router = express.Router();

router.post("/", validateUser, registration); // POST /v1/user

export default router;