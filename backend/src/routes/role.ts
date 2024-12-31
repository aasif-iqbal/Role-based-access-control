import express from "express";
import { createRoles, getRoles, deleteRole, updateRole } from "../controllers/roles";
import { validateRole } from "../middlewares/validators/role";
import onlyAdminAccess from "../middlewares/onlyAdminAccess";
import Auth from "../middlewares/authenticate";

const router = express.Router();

router.post("/", onlyAdminAccess, validateRole, createRoles); // POST /v1/role

router.get("/", onlyAdminAccess, validateRole, getRoles); // GET /v1/roles

router.patch("/:id", onlyAdminAccess, validateRole, updateRole); // PATCH /v1/role/:id

router.delete("/:id", onlyAdminAccess, validateRole, deleteRole); // DELETE /v1/roles/:id

export default router;