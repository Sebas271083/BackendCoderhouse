import express from 'express';
import __dirname from './utils/util.js'
import inicioRouter from './routes/inicio.router.js'
import cartsRouter from './routes/carts.router.js'
import productRouter from './routes/products.router.js'
import messagesRouter from './routes/messages.router.js'
import loginRouter from './routes/login.router.js'
import usersRouter from './routes/users.routes.js'
import ticketsRouter from './routes/tickets.routes.js'
import contactRouter from './routes/contacts.router.js'
import session from 'express-session'
import MongoStore from 'connect-mongo';
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import passport from 'passport';
import './passport/pasportStrategies.js'
import './DAL/db/dbConfig.js'

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Archivos estaticos
app.use(express.static(__dirname+'/public'))


//Configurar Passport


//Configurar session
app.use(session({
    store: MongoStore.create({
        mongoUrl:'mongodb+srv://sebas:sebas@cluster0.hzzhv.mongodb.net/ecommerce?retryWrites=true&w=majority',
        mongoOptions:{useNewUrlParser:true, useUnifiedTopology:true},
        ttl: 1500, 
  }),
  secret:"claveSecreta",
  resave:false,
  saveUninitialized:false
}))

app.use(passport.initialize())
app.use(passport.session())

// Se instancia la clase ProductManager con la ruta del archivo de productos

app.use((req, res, next) => {
    res.locals.email = req.session.email;
    next();
  });

app.use('/', inicioRouter)
app.use('/products', productRouter)
app.use('/carts', cartsRouter)
app.use('/chat', messagesRouter)
app.use('/login', loginRouter)
app.use('/users', usersRouter)
app.use('/tickets', ticketsRouter)
app.use('/contacts', contactRouter)




//Configuracion motor de plantillas
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/../views')
app.set('view engine', 'handlebars')

//const productManager = new ProductManager('./productos.json');

// Endpoint para obtener todos los productos

// Se inicia el servidor
const PORT = 8080;


const httpServer = app.listen(PORT, ()=> {
    console.log(`Escuchando al puerto ${PORT}`)
})

//Websocket
const infoMensajes = []
const socketServer = new Server(httpServer)

socketServer.on('connection', socket => {
    console.log(`Usuario conectado: ${socket.id}`)


socket.on('disconnect', ()=>{
    console.log(`Usuario desconectado: ${socket.id}`)
})

socket.on('mensaje', info=>{
    infoMensajes.push(info)
    // console.log(infoMensajes)
    socketServer.emit('chat', infoMensajes)
    })

socket.on('usuarioNuevo', usuario=>{
        socket.broadcast.emit('broadcast', usuario)
    })

})
