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


router.post('/signup', passport.authenticate('signup',{successRedirect:'./signupSucc'}))

router.get('/signupGithub', passport.authenticate('github', {scope: ['user:email']}))
router.get('/github', passport.authenticate('github'), (req, res) => {
 res.send('USER BY GITHUB')   
})


router.get('/bienvenida', (req, res) => {
    if(req.session?.email){
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