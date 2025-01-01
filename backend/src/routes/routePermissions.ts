import express from "express";
import {getAllRoutes} from "../controllers/routePermissions"

const router = express.Router();

router.get("/routes", getAllRoutes);  //v1/route-permissions/routes

export default router;