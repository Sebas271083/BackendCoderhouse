import {findAllTickets, createTicket, findOneTicket} from '../controllers/Ticket.controller.js'
import { Router } from 'express'

const router = Router()

router.get('/', findAllTickets)

router.get('/:idTicket', findOneTicket)

router.post('/', createTicket)


export default router


