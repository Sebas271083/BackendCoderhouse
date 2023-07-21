import passport from "passport";
import { validationResult } from "express-validator";
import Users from "../DAL/db/models/Users.model.js";


export const getLogin = async (req, res) => {
    try {
        res.render('login')
    } catch (error) {
        console.log(error)
    }
}

export const loginUser = (req, res) => {
    const { email, password } = req.body
    req.session['email'] = email
    req.session['password'] = password
    req.session['logged'] = true
    res.redirect('/products')
}

export const getSignup = (req, res) => {
    res.render('signup')
}

export const logout = (req, res) => {
    req.logout(function (err) {
        if (err) {
            // Manejo del error
            return res.status(500).json({ message: 'Error al cerrar sesión' });
        }
        // La sesión se ha destruido correctamente
        res.redirect('/login'); // Redirige al usuario a la página de inicio de sesión
    });
}


export const postSignup =  async (req, res, next) => {
    const { email } =req.body
    const user = await Users.findOne({ email })
    console.log(user)
    if( user ) {
      return res.render('signup', {error: "El Usuario ya se encuentra registrado, Inicia Sesión "})
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let validationErrors = errors.array();
        return res.render('signup', { errors: validationErrors });
      }
    passport.authenticate('signup', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ error: info.message });
      }
      
      res.render('signup', { message: 'Registro exitoso' });
    })(req, res, next);
  }