import { Router } from "express";
import {findAllNosotros, addNosotrosAll, updateN, findAllNosotrosUpdate, getUpdate} from '../controllers/nosotros.controller.js'


const router = Router()


router.get('/', findAllNosotros)
router.get('/admin', getUpdate)

router.get('/admin/update/', findAllNosotrosUpdate)
router.put('/admin/updatePut/', updateN)

router.post('/admin', addNosotrosAll)



export default router