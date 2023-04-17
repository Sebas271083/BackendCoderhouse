import {Router} from 'express'
// import {ProductManager} from '../managerProducts.js';
import {ProductManager} from "../Dao/managerProductsMongo.js"
import  __dirname  from "../util.js";


const router = Router()

const productManager = new ProductManager(__dirname+'../../productos.json')

router.get('/', async (req, res) => {
    try {
      const {title, limit, page, sort } = req.query
      const products = await productManager.getAllProducts(title, limit, page, sort);
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


  
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
  

  router.post('/', async(req, res) => {
    const newproduct = await productManager.addProduct(req.body)
    res.json({message: 'Product created', product: newproduct})
  })

  
  // Endpoint para obtener un producto por su id
  router.get('/:id', async (req, res) => {
    const productId = req.params.id;
  
    try {
      const product = await productManager.getProductById(productId);
      if (product) {
        res.json(product);
      } else {
        res.send("Producto no existe");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

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