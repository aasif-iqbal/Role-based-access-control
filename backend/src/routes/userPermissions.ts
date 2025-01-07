import express from "express";
import { getUserPermission } from "../controllers/userPermissions";
import Auth from "../middlewares/authenticate"; 
import onlyAdminAccess from "../middlewares/onlyAdminAccess";
import checkPermission from "../middlewares/checkPermission";
import { validateUserPermission } from "../middlewares/validators/userPermission";
const router = express.Router();

router.get("/:user_id", Auth, onlyAdminAccess, getUserPermission); // v1/user-permissions/6763fa0462c39d1dea26da27

// userpermissions will add by endpoint - (patch method- v1/users/:id) update user

export default router;