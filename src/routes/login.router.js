import { Router } from "express";
import UsersModel from "../DAL/db/models/Users.model.js"
import passport from "passport";


const router = Router()





router.get('/', (req, res) => {
    if (req.session.email) {
        res.redirect('login/bienvenida')
        return
    }
    console.log(req.session.email)
    res.render('login')
})

router.post('/', passport.authenticate('local'), (req, res) => {
    const { email, password } = req.body
    req.session['email'] = email
    req.session['password'] = password
    req.session['logged'] = true
    res.redirect('/products')
})

router.get('/signup', (req, res) => {
    res.render('signup')
})


router.get('/logout', (req, res) => {
    req.logout(function (err) {
        if (err) {
            // Manejo del error
            return res.status(500).json({ message: 'Error al cerrar sesión' });
        }
        // La sesión se ha destruido correctamente
        res.redirect('/login'); // Redirige al usuario a la página de inicio de sesión
    });
});


router.post('/signup', passport.authenticate('signup', { successRedirect: './signupSucc' }))

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