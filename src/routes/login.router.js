import { Router } from "express";
import UsersModel from "../db/models/Users.model.js"
import { hasData, compareData } from "../util.js";
import passport from "passport";


const router = Router()


router.get('/', (req, res)=>{
    if(req.session.email){
        res.redirect('login/bienvenida')
        return
    }
    res.render('login')
})

// router.post('/', async (req, res) => {
//     const { email, password } = req.body
//     const user = await UsersModel.findOne({email})
//     if(!user){
//         return res.json({message: 'User not found'})
//     }
//     const isPassword = await compareData(password, user.password)
//     if(!isPassword) {
//         return res.json({message: 'Contraseña icorrecta'})
//     }

//     req.session['email'] = email
//     req.session['password'] = password
//     req.session['logged'] = true
//     res.redirect('/products')
// })

router.post('/', passport.authenticate('local'), (req, res)=>{
    const { email, password } = req.body
    req.session['email'] = email
    req.session['password'] = password
    req.session['logged'] = true
    res.redirect('/products')
})

router.get('/signup', (req, res)=>{
    res.render('signup')
} )

// router.post('/signup', async(req, res)=>{
//     const user = req.body
//     const hashPassword= await hasData(user.password)
//     const newUser = {...user, password:hashPassword}
//     await UsersModel.create(newUser)
//     res.send('Usuario creado')

// } )


router.post('/signup', passport.authenticate('signup'), (req, res)=> {
    res.send('User Create')
})


router.get('/bienvenida', (req, res) => {
    if(req.session?.email){
        res.send(`Bienvenido ${req.session.email}`)
        return 
    }
    res.redirect('/')
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