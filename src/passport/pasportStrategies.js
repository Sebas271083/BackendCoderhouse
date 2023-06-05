import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy} from "passport-github2";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import usersModel from '../DAL/db/models/Users.model.js'
import { compareData, hasData } from "../utils/util.js";


//LOCALES
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
            console.log(req)
            const userDB = await usersModel.findOne({ email })
            if (userDB) { 
                return done(null, false)
            }
            console.log("req.body....  " + req.body.first_name)
            const hashPassword = await hasData(password)
            const newUser = { ...req.body, password: hashPassword }
            const newUserDB = await usersModel.create(newUser)
            done(null, newUserDB)
        }
    )
)



//GITHUB
passport.use('github', new GithubStrategy({
    clientID: 'Iv1.c232fcf862bcc6bf',
    clientSecret:'4cc3a851b5137a213ff8a1436aabf7e93520d084',
    callbackURL :'http://localhost:8080/login/github',
}, async(accessToken, refreshToken, profile, done)=>{
    console.log(profile)
    const email = profile._json.email
    const userDB = await usersModel.findOne({email})
    if(userDB) {
        done(null, false)
    }
    const newUser = {
        first_name:profile._json.name.split(' ')[0],
        last_name:profile._json.name.split(' ')[1],
        email,
        password:''
    } 
    const newUserDB = await usersModel.create(newUser)
    done(null, newUserDB)
}))


//GOOGLE

passport.use('googleSignUp', new GoogleStrategy({
    clientID: '387798725688-rrhdn1jknhmfmrqcnlde39r66ff68def.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:8080/login/googleCallback",
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const { email, given_name, family_name } = profile._json;
        console.log(profile)
        console.log(email)

        // Verificar si el usuario ya existe en la base de datos
        const existingUser = await usersModel.findOne({ email });

        if (existingUser) {
            // Si el usuario ya existe, se pasa el objeto `existingUser` a la función `done`
            done(null, existingUser);
        } else {
            // Si el usuario no existe, se crea uno nuevo en la base de datos
            const newUser = await usersModel.create({
                first_name: given_name,
                last_name: family_name,
                email
            });
            done(null, newUser);
        }
    } catch (error) {
        done(error);
    }
}));


passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
    const user = await usersModel.findById(id)
    done(null, user)
});


