import express from "express";
import {getAllRoutes, addRoutePermission} from "../controllers/routePermissions"
import {validateRoutePermission} from "../middlewares/validators/routePermissions";
const router = express.Router();

router.get("/routes", getAllRoutes);  //v1/route-permissions/routes
router.post("/add", validateRoutePermission, addRoutePermission);  //v1/route-permissions/add

export default router;