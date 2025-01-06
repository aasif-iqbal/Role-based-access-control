import express from "express";
import { createPost, getPosts } from "../controllers/posts"; 
import { validatePost } from "../middlewares/validators/post";
import onlyAdminAccess from "../middlewares/onlyAdminAccess";
import Auth from "../middlewares/authenticate";
import checkPermission from "../middlewares/checkPermission";

const router = express.Router();

router.post("/", Auth, onlyAdminAccess, validatePost, createPost); // POST /v1/posts

router.get("/", Auth, checkPermission, getPosts); // GET /v1/posts


export default router;