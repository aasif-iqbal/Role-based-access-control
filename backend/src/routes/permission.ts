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
router.patch("/:id", Auth, onlyAdminAccess, validatePermission, updatePermission); // POST /v1/permission

//Method:DELETE | localhost:3000/v1/permission/12345
router.delete("/:id", Auth, onlyAdminAccess, validatePermission, deletePermission);

export default router;