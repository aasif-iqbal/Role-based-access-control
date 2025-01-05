import express from "express";
import {getAllRoutes, addRoutePermission, getRoutePermissions} from "../controllers/routePermissions";
import {validateRoutePermission} from "../middlewares/validators/routePermissions";
import Auth from "../middlewares/authenticate"; 
import onlyAdminAccess from "../middlewares/onlyAdminAccess";

const router = express.Router();

router.get("/route", Auth, onlyAdminAccess, getAllRoutes);  //v1/route-permissions/route
router.post("/route", Auth, onlyAdminAccess, validateRoutePermission, addRoutePermission);  //v1/route-permissions/route

router.get("/", Auth, onlyAdminAccess, getRoutePermissions); //v1/route-permissions/endpoint


export default router;