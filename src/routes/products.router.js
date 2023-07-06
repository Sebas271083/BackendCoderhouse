import {Router} from 'express'
// import {ProductManager} from '../managerProducts.js';
import {ProductManager} from "../DAL/DAOs/managerProducts.js"
import  __dirname  from "../utils/util.js";
import session from 'express-session';
import {findAllProducts, findOneProduct,createOneProduct, findAllProductsAdmin, updateOneProduct, updateProduct, deleteProduct} from '../controllers/ProductsMongo.controller.js'



const router = Router()

router.use(session({
  secret: 'claveSecreta',
  resave: false,
  saveUninitialized: true,
}));

// const productManager = new ProductManager(__dirname+'../../productos.json')
const productManager = new ProductManager()


router.get('/', findAllProducts);


router.get('/listar-productos', findAllProductsAdmin)
router.get('/actualizar-producto/:id', updateProduct)
router.put('/actualizar/:productId', updateOneProduct)
router.delete('/delete/:id', deleteProduct)


  
router.get('/paginate', async (req, res) => {
  try {
    const {title, limit, page, sort } = req.query
    const products = await productManager.getPaginate(title, limit, page, sort);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
  

  router.get('/crear-producto', (req, res) => {
    res.render('productsCreate', { layout: 'administracion' });
  });




  router.post('/', createOneProduct)

  
  // Endpoint para obtener un producto por su id
  router.get('/:id', findOneProduct);
  

  router.put('/:id', async(req, res) => {
    try {
      const productId = req.params.id;
      const updatedProduct = await productManager.updateProduct(productId, req.body);
      res.json(updatedProduct);
    } catch (error) {
      console.log(error)
    }
  })
  
  router.delete('/:id', async(req, res) => {
    try {
      const productId = req.params.id;
      const deleteProduct = await productManager.deleteProduct(productId);
      res.json(deleteProduct);
    } catch (error) {
      console.log(error)
    }
  })
  
  export default router