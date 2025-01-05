import express from "express";
import { createRoles, getRoles, deleteRole, updateRole } from "../controllers/roles";
import { validateRole } from "../middlewares/validators/role";
import onlyAdminAccess from "../middlewares/onlyAdminAccess";
import Auth from "../middlewares/authenticate";
import checkPermission from "../middlewares/checkPermission";

const router = express.Router();

router.post("/", Auth, onlyAdminAccess, validateRole, createRoles); // POST /v1/roles

router.get("/", Auth, checkPermission, getRoles); // GET /v1/roles

router.patch("/:id", Auth, onlyAdminAccess, validateRole, updateRole); // PATCH /v1/roles/:id

router.delete("/:id", Auth, onlyAdminAccess, deleteRole); // DELETE /v1/roles/:id

export default router;