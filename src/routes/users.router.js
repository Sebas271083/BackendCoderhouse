import Router from 'express'
import  __dirname  from "../utils/util.js";
import {findAllUsers, findOneUser} from '../controllers/Users.controller.js'
import { getUser } from '../service/Users.service.js';

const router = Router()

router.get('/', findAllUsers)

router.get('/:id', async(req, res)=>{
    const {id} = req.params
    try {
        const user = await getUser(id)
        if(user){
            // res.json({message:'User', user})
            res.render('recPassword', user);
        }else {
            res.status(200).json({message:'No user'})
        }
    } catch (error) {
        console.log(error)
    }
})


router.get('/perfil/perfil', (req, res)=>{
    res.render('recPassword')
})




export default router