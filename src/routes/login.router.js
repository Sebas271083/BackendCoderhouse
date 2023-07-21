import { Router } from "express";
import { getLogin, getSignup, loginUser, logout, postSignup } from "../controllers/login.controllers.js";
import { check } from "express-validator";
import passport from "passport";


const router = Router()


router.get('/', getLogin)

router.post('/', passport.authenticate('local'), loginUser)

router.get('/signup', getSignup)


router.get('/logout', logout);

router.post('/signup', [
    check('first_name').notEmpty().withMessage('El nombre es obligatorio'),
    check('last_name').notEmpty().withMessage('El apellido es obligatorio'),
    check('password').isLength({ min: 4 }).withMessage('La contraseña debe tener al menos 4 caracteres')
        .matches(/\d/).withMessage('La contraseña debe contener al menos un número'),
    check('email').isEmail().withMessage('El correo electrónico debe tener un formato válido')
], postSignup);

router.get('/signupGithub', passport.authenticate('github', { scope: ['user:email'] }))
router.get('/github', passport.authenticate('github'), (req, res) => {
    res.send('USER BY GITHUB')
})


//GOOGLE
router.get('/google', passport.authenticate('googleSignUp', {
    scope: ['profile', 'email']
}))

router.get('/googleCallback', passport.authenticate('googleSignUp'), (req, res) => {
    // Aquí se ha autenticado con éxito a través de Google
    // Puedes iniciar sesión y redirigir al usuario a otra página
    req.login(req.user, (err) => {
        if (err) {
            // Manejo de errores si hay algún problema al iniciar sesión
            console.error(err);
            return res.status(500).send('Error al iniciar sesión');
        }

        req.session.email = req.user.email;

        // Redirigir al usuario a una página de inicio de sesión exitosa
        res.redirect('/products');
    });
})

router.get('/bienvenida', (req, res) => {
    if (req.session?.email) {
        console.log("mail:::::" + req.session.email)
        res.send(`Bienvenido ${req.session.email}`)
        return
    }
    res.redirect('/')
})

router.get('/signupSucc', (req, res) => {
    res.render('signupSucc')
})


router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(() => {
            res.redirect('/login');
        });
    } else {
        res.redirect('/login');
    }
});


export default router