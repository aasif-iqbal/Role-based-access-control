import express from "express";
import { validatePermission } from "../middlewares/validators/permission";
import Auth from "../middlewares/authenticate"; 
import onlyAdminAccess from "../middlewares/onlyAdminAccess";
import checkPermission from "../middlewares/checkPermission";

import { 
  createPermission, 
  getPermissions, 
  updatePermission, 
  deletePermission 
} from "../controllers/permissions";

const router = express.Router();

router.post("/", Auth, onlyAdminAccess, validatePermission, createPermission); // POST /v1/permissions
router.get("/", Auth, onlyAdminAccess, validatePermission, getPermissions); 
// GET /v1/permissions
router.patch("/:id", Auth, onlyAdminAccess, validatePermission, updatePermission); // POST /v1/permissions/6773fa0462c39d1dea26da27

router.delete("/:id", Auth, onlyAdminAccess, validatePermission, deletePermission);
//v1/permission/6773fa0462c39d1dea26da27

export default router;