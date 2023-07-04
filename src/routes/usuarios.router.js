import { Router } from "express";
import {findAllUsers, findOneUser} from '../controllers/Users.controller.js'


const router = Router()

router.get('/', findAllUsers)

router.get('/:id', findOneUser)


router.get('/perfil/perfil', (req, res)=>{
    res.render('recPassword')
})

export default router