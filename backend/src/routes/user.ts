import express from "express";
import { registration, login, createUser, getAllUsers, getProfile, updateUser, deleteUser } from "../controllers/users";
import { validateUser } from "../middlewares/validators/user";
import { validateLogin } from "../middlewares/validators/login";
import onlyAdminAccess from "../middlewares/onlyAdminAccess";
import Auth from "../middlewares/authenticate";

const router = express.Router();

router.post("/registration", validateUser, registration); // POST /v1/user/registration
router.post("/login", validateLogin, login); // POST /v1/user/login
router.post("/", Auth, onlyAdminAccess, validateUser, createUser); // POST /v1/user
router.get("/", Auth, onlyAdminAccess, getAllUsers); // GET /v1/users
router.get("/:id", Auth, onlyAdminAccess, getProfile); // GET /v1/user/:id

// localhost:3000/v1/user/6763433e75c6d53e4da121b6
router.patch("/:id", Auth, onlyAdminAccess, validateUser, updateUser); // PATCH /v1/user/
router.delete("/:id", Auth, onlyAdminAccess, validateUser, deleteUser); // DELETE /v1/user

export default router;