import express from "express";
import { createUser } from "../controllers/users";
import { validateUser } from "../middlewares/validators/user";

const router = express.Router();

router.post("/", validateUser, createUser); // POST /v1/user

export default router;