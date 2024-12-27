import express from "express";
import { createRoles, getRoles, deleteRole, updateRole } from "../controllers/roles";
import { validateRole } from "../middlewares/validators/role";
import onlyAdminAccess from "../middlewares/onlyAdminAccess";

const router = express.Router();

router.post("/admin/roles", onlyAdminAccess, validateRole, createRoles); // POST /v1/admin

router.get("/admin/roles", onlyAdminAccess, validateRole, getRoles); // POST /v1/admin/roles

router.delete("/admin/roles/:id", onlyAdminAccess, validateRole, deleteRole);

router.patch("/admin/roles/:id", onlyAdminAccess, validateRole, updateRole);


export default router;