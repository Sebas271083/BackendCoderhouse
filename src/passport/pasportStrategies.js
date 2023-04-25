import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import usersModel from '../db/models/Users.model.js'
import { compareData, hasData } from "../util.js";

passport.use('local', new LocalStrategy(
    {
        usernameField: 'email',
    }, async (email, password, done) => {
        const user = await usersModel.findOne({ email })
        if (!user) {
            return done(null, false)
        }
        const isPassword = await compareData(password, user.password)
        if (!isPassword) {
            return done(null, false)
        }
        done(null, user)
    }
))



passport.use(
    'signup',
    new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    },
        async (req, email, password, done) => {
            const userDB = await usersModel.findOne({ email })
            if (userDB) {
                return done(null, false)
            }
            const hashPassword = await hasData(password)
            const newUser = { ...req.body, password: hashPassword }
            const newUserDB = await usersModel.create(newUser)
            done(null, newUserDB)
        }
    )
)



passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
    const user = await usersModel.findById(id)
    done(null, user)
});


