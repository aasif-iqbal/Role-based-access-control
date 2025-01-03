import express from "express";
import { getUserPermission } from "../controllers/userPermissions";
import Auth from "../middlewares/authenticate"; 
import onlyAdminAccess from "../middlewares/onlyAdminAccess";

const router = express.Router();

router.get("/:user_id", getUserPermission); //v1/user-permissions/6763fa0462c39d1dea26da27

export default router;