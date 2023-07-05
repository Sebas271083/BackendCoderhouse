import nodemailer from 'nodemailer'
import config from '../config.js';


const emailOlvidePassword = async(datos) => {
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: config.gmail_user,
            pass: config.gmail_password
        }
      });
  
      const { email, token } = datos
      
      //Enviar el email
      await transport.sendMail({
        from: 'ecommerce.com',
        to: email,
        subject: 'Restablece tu password en Ecommerce.com',
        text: 'Restablece tu password en BienesRaices.com',
        html: `<p>Hola ${email}, has solicitado reestablecer tu password en Ecommerce.com</p>
  
              <p>Sigue el siguiente enlace para generar un password nuevo: 
              <a href="http://localhost:${config.port ?? 4000}/usuarios/olvide-password/${token}">Reestablecer Password</a></p>
  
              <p>Si tu no solicitaste el cambio de password, puedes ignorar este mensaje</p>
              `
      })
  }

  export default emailOlvidePassword