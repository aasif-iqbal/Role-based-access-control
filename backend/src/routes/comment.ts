import express from "express";
import { createComment, getComments } from "../controllers/comments";
import onlyAdminAccess from "../middlewares/onlyAdminAccess";
import Auth from "../middlewares/authenticate";
import checkPermission from "../middlewares/checkPermission";
import { validateComment } from "../middlewares/validators/comment";

const router = express.Router();

router.post("/", Auth, onlyAdminAccess, validateComment, createComment); // POST /v1/comments

router.get("/", Auth, checkPermission, getComments); // GET /v1/comments

export default router;