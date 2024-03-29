import { Router } from "express";
import {findAllUsers, findOneUser, UserByEmail, recuperarPassword, modificarPassword, updateUser, updateOneUser, deleteUser } from '../controllers/Users.controller.js'


const router = Router()

router.get('/', findAllUsers)

router.get('/recuperar-password', findOneUser)

router.post('/recuperar-password', UserByEmail)

router.get('/olvide-password/:id', recuperarPassword)
router.post('/olvide-password/:id', modificarPassword)


router.get('/actualizar-usuario/:id', updateUser)
router.put('/actualizar/:usuarioId', updateOneUser)
router.delete('/delete/:id', deleteUser)


export default router