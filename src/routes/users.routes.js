import Router from 'express'
import {findAllUsers} from '../controllers/Users.controller.js'

const router = Router()

router.get('/', findAllUsers)

router.get('/perfil', (req, res)=>{
    console.log(req.user._id)
})


export default router