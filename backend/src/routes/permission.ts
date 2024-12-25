import express from "express";
import { validatePermission } from "../middlewares/validators/permission";
import Auth from "../middlewares/authenticate"; 
import onlyAdminAccess from "../middlewares/onlyAdminAccess";
import { 
  createPermission, 
  getPermissions, 
  updatePermission, 
  deletePermission 
} from "../controllers/permissions";

const router = express.Router();

router.post("/", Auth, onlyAdminAccess, validatePermission, createPermission); // POST /v1/permission
router.get("/", Auth, onlyAdminAccess, validatePermission, getPermissions); // POST /v1/permission
router.patch("/", Auth, onlyAdminAccess, validatePermission, updatePermission); // POST /v1/permission
router.delete("/", Auth, onlyAdminAccess, validatePermission, deletePermission); // POST /v1/permission

export default router;