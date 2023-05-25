import mongoose from "mongoose";

const URI = 'mongodb+srv://sebas:sebas@cluster0.hzzhv.mongodb.net/ecommerce?retryWrites=true&w=majority'

mongoose.connect(URI)
    .then(()=> console.log('Conectado a la base de datos'))
    .catch((error) => console.log(error))