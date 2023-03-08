const express = require('express');
const ProductManager = require('./index.js');

const app = express();

// Se instancia la clase ProductManager con la ruta del archivo de productos
const productManager = new ProductManager('./productos.json');

// Endpoint para obtener todos los productos
app.get('/products', async (req, res) => {
  try {
    const products = await productManager.getProducts();
    let limit = req.query.limit; // Se obtiene el query param limit
    if (limit) {
      products.splice(limit); // Si se recibe un límite, se devuelve sólo el número de productos solicitados
    }
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint para obtener un producto por su id
app.get('/products/:id', async (req, res) => {
    const productId = req.params.id;
    const products = await productManager.getProducts();
    const product = products.find(product => product.id === parseInt(productId));
  try {
    if(product) {
        const product = await productManager.getProductById(req.params.id);
        res.json(product);
    } else {
        res.send("Producto no existe")
    }

  } catch (error) {
    console.log(req.params.id)
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Se inicia el servidor
const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
