import express from "express";
import { createUser } from "../controllers/users";

const router = express.Router();

router.post("/", createUser); // POST /v1/user

export default router;  










