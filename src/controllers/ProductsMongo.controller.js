import {getAllProducts, getProductById, addProduct, updateProductOne} from '../service/ProductsMongo.service.js'

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
        const newProduct = await addProduct(req.body)
        // res.status(200).json({message: 'Product Created', Product: newProduct})
        res.render('product', newProduct);
    } catch (error) {
        console.log(error)
    }
}

export const updateOneProduct = async(req, res)=>{
    try {
        console.log(req.params)
        const {userId} = req.params;
        console.log(userId)
        const updatedProduct = await updateProductOne(userId, req.body);
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


export const deleteOneProduct = async(req, res)=>{
    try {
        const productId = req.params.id;
        const deleteOneProduct = await deleteProduct(productId);
        res.json(deleteOneProduct);
      } catch (error) {
        console.log(error)
      }
}

