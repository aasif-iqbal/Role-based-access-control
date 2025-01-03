import express from "express";
import {getAllRoutes, addRoutePermission, getRoutePermissions} from "../controllers/routePermissions";
import {validateRoutePermission} from "../middlewares/validators/routePermissions";
import Auth from "../middlewares/authenticate"; 
import onlyAdminAccess from "../middlewares/onlyAdminAccess";

const router = express.Router();

router.get("/routes", Auth, onlyAdminAccess, getAllRoutes);  //v1/route-permissions/routes
router.post("/add", Auth, onlyAdminAccess, validateRoutePermission, addRoutePermission);  //v1/route-permissions/add
router.get("/", Auth, onlyAdminAccess, getRoutePermissions); //v1/route-permissions/endpoint


export default router;