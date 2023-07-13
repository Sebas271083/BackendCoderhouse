import { Router } from "express";
import { transporter } from "../js/contacto.js";

const router = Router()


router.get('/', (req, res) => {
    res.render('contacts')
})




router.post('/', async (req, res) => {
    const { name, email, message } = req.body
    console.log(name, email, message)
    try {
        const mail = {
            from: 'Coderhouse',
            to: email,
            subject: `Bienvenido ${name}`,
            text: message
        }

        await transporter.sendMail(mail)
        res.render('contacts', { success: true })
        // Establecer success en false después de 3 segundos

    } catch (error) {
        res.json({ message: 'Error!', error })
    }
})



export default router