import express from "express";
import { registration, login, createUser } from "../controllers/users";
import { validateUser } from "../middlewares/validators/user";
import { validateLogin } from "../middlewares/validators/login";
import onlyAdminAccess from "../middlewares/onlyAdminAccess";

const router = express.Router();

router.post("/registration", validateUser, registration); // POST /v1/user/registration
router.post("/login", validateLogin, login); // POST /v1/user
router.post("/admin/users", onlyAdminAccess, validateUser, createUser); // POST /v1/admin/users 

export default router;