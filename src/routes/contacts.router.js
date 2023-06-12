import { Router } from "express";
import { transporter } from "../js/contacto.js";

const router = Router()


router.get('/', (req, res)=>{
    res.render('contacts')
})




router.post('/', async (req,res)=> {
    const {name, email, message} = req.body
    console.log(name, email, message)
    try {
        const mail={
            from: 'Coderhouse',
            to:email,
            subject: `Bienvenido ${name}`,
            text: message
            // attachments:[
            //     {path:__dirname+'/descarga.jpg'}
            // ]
        }

        await transporter.sendMail(mail)
        res.send(`<h1>Email enviando con exito</h1>
        <p>Nos contactaremos a la brevedad</p>
        <button onclick="history.back()">Volver</button>`)
    } catch (error) {
        res.json({message: 'Error!', error})
    }
})



export default router