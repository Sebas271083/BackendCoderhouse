import {getAllProducts, getProductById, addProduct, updateProductOne, deleteProductId} from '../service/ProductsMongo.service.js'
import multer from 'multer'
import { generarId } from '../helpers/token.js';
import __dirname from '../utils/util.js';
// Configurar el almacenamiento del archivo
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(file)
      cb(null, __dirname + '/../public/uploads');
    },
    filename: function (req, file, cb) {
        const uniqueId = generarId();
        cb(null, `${uniqueId} - ${file.originalname}`);
    }
  });

  // Configurar el middleware de Multer
const uploads = multer({ storage: storage });
export const upload = uploads.single('img')




export const findAllProducts = async(req, res)=>{
    try {
        const products = await getAllProducts()
        if(products.length){
            console.log(products)

            // res.status(200).json({message:"Products found", products})
            res.render('products', { products: products });

        } else {
            res.status(200).json({message:"No Products"})
        }
    } catch (error) {
        console.log(error)
    }
}


export const findAllProductsAdmin = async (req, res)=>{
    try {
        const products = await getAllProducts()
        if(products.length){
            console.log(products)

            // res.status(200).json({message:"Products found", products})
            res.render('productsAdmin', { layout: 'administracion', products });

        } else {
            res.status(200).json({message:"No Products"})
        }
    } catch (error) {
        console.log(error)
    }
}

export const findOneProduct = async(req, res)=>{
    const {id} = req.params
    try {
        const product = await getProductById(id)
        if(product){
            console.log(product)
            res.render('product', product );
        }else {
            res.status(200).json({message:'No product'})
        }
    } catch (error) {
        console.log(error)
    }
}


export const createOneProduct = async(req, res)=>{
    const {title, description, price, code, stock} = req.body
    if(!title || !description || !price || !code || !stock) {
        res.status(400).json({message: 'Data missing'})
    }

    try {
        const newProduct = req.body
        newProduct.img = req.file.filename //Agregar el nombre de la imagen al objeto req.body

        const createdProduct = await addProduct(newProduct)
        // res.status(200).json({message: 'Product Created', Product: newProduct})
        res.render('product', newProduct);
    } catch (error) {
        console.log(error)
    }
}

export const updateOneProduct = async(req, res)=>{
    try {
        console.log(req.params)
        const {productId} = req.params;
        console.log(productId)
        const updatedProduct = await updateProductOne(productId, req.body);
        console.log(updateProduct)
        res.redirect('/admin');
      } catch (error) {
        console.log(error)
      }
}

export const updateProduct = async(req, res)=> {
    const {id} = req.params
    try {
        const product = await getProductById(id)
        if(product){
            console.log(product)
            res.render('productsEditAdmin', product );
        }else {
            res.status(200).json({message:'No product'})
        }
    } catch (error) {
        console.log(error)
    }
}


export const deleteProduct = async(req, res)=>{
    try {
        const id = req.params.id;
        console.log(id)
        const deleteOneProduct = await deleteProductId(id);
        res.redirect('/admin')
      } catch (error) {
        console.log(error)
      }
}

