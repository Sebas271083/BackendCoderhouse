import express from 'express';
import cartsRouter from './routes/carts.router.js'
import productRouter from './routes/products.router.js'

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Se instancia la clase ProductManager con la ruta del archivo de productos

app.use('/products', productRouter)
app.use('/carts', cartsRouter)


//const productManager = new ProductManager('./productos.json');

// Endpoint para obtener todos los productos

// Se inicia el servidor
const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
