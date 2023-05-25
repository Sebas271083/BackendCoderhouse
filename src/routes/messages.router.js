import {Router} from 'express'
import  __dirname  from "../util.js";
import { MessageManager } from '../DAL/managerMessagesMongo.js';

const messageManager = new MessageManager();

const router = Router()

router.get('/', (req, res) => {
    res.render('chatHandlebars')
});


router.post('/', async(req, res) => {
    const newMessage = await messageManager.addMessage(req.body)
    res.json({message: 'Message Saved', Message: newMessage})
    // res.render('chatHandlebars')
  })


export default router
