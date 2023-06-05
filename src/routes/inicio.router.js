import { Router } from "express";

const router = Router()

router.get('/inicio', (req, res)=> {
    res.render('inicio')
})




export default router