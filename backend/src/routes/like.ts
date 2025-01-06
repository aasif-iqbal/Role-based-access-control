import express from "express";
import { postLike, postUnlike, deleteLike, getLikes } from "../controllers/likes";
import onlyAdminAccess from "../middlewares/onlyAdminAccess";
import Auth from "../middlewares/authenticate";
import checkPermission from "../middlewares/checkPermission";
import { validateLike } from "../middlewares/validators/like";

const router = express.Router();

router.post("/", Auth, onlyAdminAccess, validateLike, postLike); // POST /v1/likes

router.get("/", Auth, checkPermission, getLikes); // GET /v1/likes

export default router;