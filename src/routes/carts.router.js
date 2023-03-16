import { Router } from "express";
import { ManagerCart } from "../managerCart.js";
import { __dirname } from "../util.js";

const router = Router();
const managerCart = new ManagerCart(__dirname+'/Carts.json')


//Crear Carrito
router.post('/', async (req, res) => {
    const newCart = await managerCart.createCart()
    res.json({cart: newCart})
})

//Buscar un carrito
router.get('/:idCart', async (req, res) => {
    const {idCart} = req.params
    const cart = await managerCart.getCart(+idCart)
    res.json({cart})
})


//Agregar un producto a un carrito
router.post('/:idCart/product/:idProduct', async (req, res) => {
const {idCart, idProduct} = req.params
const addProduct = await managerCart.addProductToCart(+idCart, +idProduct)
res.json({message:addProduct})
})




export default router