import express from "express";
import { registration, login } from "../controllers/users";
import { validateUser } from "../middlewares/validators/user";
import { validateLogin } from "../middlewares/validators/login";

const router = express.Router();

router.post("/registration", validateUser, registration); // POST /v1/user/registration
router.post("/login", validateLogin, login); // POST /v1/user

export default router;