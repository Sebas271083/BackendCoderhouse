import { Router } from "express";
import { findCart, createCart, findOneCart, createProductCart, deleteProductCart } from "../controllers/Cart.controller.js"
import  __dirname  from "../utils/util.js";

const router = Router();



//Crear Carrito
router.post('/', createCart);

//Buscar los carritos
router.get('/', findCart);


router.get('/finalizarCompra', async(req, res)=>{
  res.send("compra Realizada")
})

//Buscar un carrito
router.get('/:idCart', findOneCart)


//Agregar un producto a un carrito
router.post('/:idCart/product/:idProduct/:idUser', createProductCart )

//Eliminar del carrito el producto seleccionado
router.delete('/delete/:pid', deleteProductCart)




export default router