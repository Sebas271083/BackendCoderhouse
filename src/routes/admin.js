import { Router } from "express";
import { admin } from "../controllers/admin.contollers.js";

const router = Router()

router.get('/', admin)


export default router